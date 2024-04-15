import axios, { AxiosError, type AxiosRequestConfig, type Method } from 'axios'
import { interceptRequest, interceptResponse } from './interceptor'
import { CODE_UNKNOWN_ERROR } from '@/constants'
export type R<T> = HttpResponse<T>
export interface HttpResponse<T = any> {
    status: 'succeed' | 'failed'
    msg: string
    code: number
    data: T
}

const axiosInstance = axios.create()
interceptRequest(axiosInstance)
interceptResponse(axiosInstance)

if (import.meta.env.VITE_AXIOS_BASE_URL) {
    axiosInstance.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL
}

export function post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined,
): Promise<HttpResponse<T>> {
    console.log('✅')

    return axiosRequest({
        method: 'post',
        url,
        data,
        ...config,
    })
}

export function get<T>(
    url: string,
    config?: AxiosRequestConfig<any> | undefined,
): Promise<HttpResponse<T>> {
    return axiosRequest({
        method: 'get',
        url,
        ...config,
    })
}

export default axiosInstance

/**
 * 这里要做错误处理吗？如果要做，那么需要捕获哪些错误？
 * 通过在这里捕获这些错误，带来了什么好处吗？
 *
 *      好处：组件中能处理的错误，是根据业务来的，比如注册时的错误如果是用户已存在，则这种错误应该交给组件处理。
 *      但是每个错误是不适合组件处理的，或者说，有些错误是通用的，如果让组件单独处理的话，重复的代码很特别多
 *      比如请求失败/无网络时，前端根本不会获得任何后端返回的数据，这个时候就可以在这里自行封装一个响应对象
 *      该响应对象和通用响应对象保持一致。
 *
 *      总的来说，这里要做错误处理，目的是为了让组件中能够只收到一个统一的对象，这样可以减轻组件中代码的编写
 */
async function axiosRequest({
    method,
    url,
    data,
    ...config
}: AxiosRequestConfig<any>) {
    try {
        const response = (await axiosInstance({
            method,
            url,
            data,
            ...config,
        })) as HttpResponse
        // token = response.headers['x-token']
        // userId = response.headers['x-userid']
        // username = response.headers['x-username']
        return response
    } catch (error: any) {
        /*
        这里的逻辑需要重新思考一下。
        在此之前，我的想法是，当请求错误/失败时，我都让这个请求不报错。
        让它始终返回一个固定格式的对象。
        然后具体的错误处理都是根据这个格式对象来处理的。
        这样一来，我在实际代码中就不需要 try catch
        但这种做法真的好吗？我不知道，因为我发现 arco 开源项目中，它是通过 try catch
        捕获错误的。

        也许，我这里可以继续封装，但是封装后，我应该通过 throw 的方式再次抛出。
        而不是直接 return 一个对象
        也就是说，我应该让错误“冒泡”到组件，由组件进行处理。
        但这样不是很麻烦吗？如果中间层级过多，那岂不是每一个层级都需要 try catch，
        然后 throw ？
        */
        console.error('❌请求错误：', error)
        const resData: HttpResponse = {
            status: 'failed',
            code: CODE_UNKNOWN_ERROR,
            msg: '未知错误',
            data: error as any,
        }
        if (error.__proto__.constructor.name !== 'AxiosError') {
            return resData
        }
        const e = error as AxiosError
        if (e.response) {
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            // @ts-ignore
            if (e.response.data?.data) {
                return e.response.data
            }
            return resData
        } else if (e.request) {
            // 请求已经成功发起，但没有收到响应
            resData.msg = 'api.error.not-response'
        } else {
            // 发送请求时出了点问题
            resData.msg = 'api.error.request'
        }
        return resData
    }
}
