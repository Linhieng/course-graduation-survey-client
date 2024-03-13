import type { ResBase } from "@/types"
import axios, { type AxiosRequestConfig } from "axios"

const BASE_URL = 'http://192.168.142.219:3000'

axios.defaults.baseURL = BASE_URL

type Method = 'get' | 'post'

/**
 * TODO: 这里要做错误处理吗？如果要做，那么需要捕获哪些错误？
 * 通过在这里捕获这些错误，带来了什么好处吗？
 */

async function axiosRequest(method: Method, url: string, config?: AxiosRequestConfig<ReqAllowType>) {
    const response = await axios<ResBase>({
        method,
        url,
        ...config
    })

    return response.data
}

export const get = (url: string, config?: AxiosRequestConfig<ReqAllowType>) =>
    axiosRequest('get', url, config)
export const post = (url: string, config?: AxiosRequestConfig<ReqAllowType>) =>
    axiosRequest('post', url, config)
