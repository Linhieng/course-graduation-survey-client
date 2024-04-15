import { useUserStore } from '@/store'
import { getToken } from '@/utils/auth'
import { msgError } from '@/utils'
import type { AxiosInstance } from 'axios'
export function interceptRequest(axios: AxiosInstance) {
    axios.interceptors.request.use(
        (config) => {
            // 如果存在 token 的话，请求时自动添加上 token 到请求头
            // 的 Authorization 中。
            const token = getToken()
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        (error) => {
            // do something
            return Promise.reject(error)
        },
    )
}

export function interceptResponse(axios: AxiosInstance) {
    axios.interceptors.response.use(
        (response) => {
            const res = response.data
            // code 大于 20000 的，被认为是请求错误
            if (res.code !== 20000) {
                msgError(res.msg || 'Error')
                // 50008: 非法的 token
                // 50014: token 已过期
                if (
                    [50008, 50014].includes(res.code) &&
                    response.config.url !== '/api/user/info'
                ) {
                    msgError('token 无效')
                    const userStore = useUserStore()
                    ;(async () => {
                        // await userStore.logout()
                        window.location.reload()
                    })()
                }
                return Promise.reject(new Error(res.msg || 'Error'))
            }
            return res
        },
        (error) => {
            msgError(error.msg || 'Request Error')
            return Promise.reject(error)
        },
    )
}
