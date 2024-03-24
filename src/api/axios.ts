import { CODE_UNKNOWN_ERROR } from "@/constants"
import type { ResBase, ResPro } from "@/types"
import type { ReqAllowType } from "@/types/request"
import axios, { AxiosError, type AxiosRequestConfig } from "axios"


const BASE_URL = import.meta.env.VITE_AXIOS_BASE_URL
let token = ''
let userId = ''
let username = ''
axios.defaults.baseURL = BASE_URL
// axios.defaults.withCredentials = true

type Method = 'get' | 'post'

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
async function axiosRequest(method: Method, url: string, config?: AxiosRequestConfig<ReqAllowType>): ResPro {
    try {
        const response = await axios<ResBase>({
            method,
            url,
            ...config
        })
        token = response.headers['x-token']
        userId = response.headers['x-userid']
        username = response.headers['x-username']
        return response.data
    } catch (error: any) {
        console.error(error)
        const resData: ResBase = {
            status: 'failed',
            code: CODE_UNKNOWN_ERROR,
            msg: '未知错误',
            data: error as any
        }
        if (error.__proto__.constructor.name !== 'AxiosError') {
            return resData
        }
        const e = error as AxiosError
        if (e.response) {
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            // @ts-ignore
            if (e.response.data?.data) {
                return (e.response.data as ResBase)
            }
            return resData
        } else if (e.request) {
            resData.msg = '请求已经成功发起，但没有收到响应'
        } else {
            resData.msg = '发送请求时出了点问题'
        }
        return resData
    }
}

export const get = (url: string, config?: AxiosRequestConfig<ReqAllowType>) => {
    const config2 = config || [] as any
    config2.headers = {
        ...config?.headers,
        token,
        userId,
        username,
    }
    return axiosRequest('get', url, config2)
}
export const post = (url: string, config?: AxiosRequestConfig<ReqAllowType>) => {
    const config2 = config || [] as any
    config2.headers = {
        ...config?.headers,
        token,
        userId,
        username,
    }
    return axiosRequest('post', url, config2)
}
