import { CODE_UNKNOWN_ERROR } from "@/constants"
import type { ResBase } from "@/types"
import axios, { type AxiosRequestConfig } from "axios"

const BASE_URL = 'https://api.localhost'

axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

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

async function axiosRequest(method: Method, url: string, config?: AxiosRequestConfig<ReqAllowType>) {
    try {
        const response = await axios<ResBase>({
            method,
            url,
            ...config
        })
        return response.data
    } catch (error: any) {
        const resData: ResBase = {
            status: 'failed',
            code: CODE_UNKNOWN_ERROR,
            msg: '未知错误',
            data: error as any
        }
        if (error.name === "AxiosError" && error.code === "ERR_NETWORK") {
            resData.msg = '网络错误'
        }
        return resData
    }
}

export const get = (url: string, config?: AxiosRequestConfig<ReqAllowType>) =>
    axiosRequest('get', url, config)
export const post = (url: string, config?: AxiosRequestConfig<ReqAllowType>) =>
    axiosRequest('post', url, config)
