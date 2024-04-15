import axios, { type AxiosRequestConfig } from 'axios'
import { interceptRequest, interceptResponse } from './interceptor'
export type R<T> = HttpResponse<T>
export interface HttpResponse<T = any> {
    // 后端还没有添加属性，这是在拦截器中添加的。
    // 因为 status 就两个值，使用 Boolean 更好，和 fetch api 一样
    ok: boolean
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
    ...args: [
        url: string,
        data?: any,
        config?: AxiosRequestConfig<any> | undefined,
    ]
): Promise<HttpResponse<T>> {
    return axiosInstance.post(...args)
}

export function get<T>(
    ...args: [url: string, config?: AxiosRequestConfig<any> | undefined]
): Promise<HttpResponse<T>> {
    return axiosInstance.get(...args)
}

export default axiosInstance
