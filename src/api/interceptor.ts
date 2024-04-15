import { useUserStore } from '@/store'
import { getToken } from '@/utils/auth'
import { msgError } from '@/utils'
import type { AxiosInstance } from 'axios'
import type { HttpResponse } from '.'

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
        // @ts-ignore
        (response) => {
            const res = response.data as HttpResponse

            // 会进入到这里的，说明状态码是 2xx
            // 然后由于 status 错误，这种情况应该交给顶层处理
            // 也就是说，msg 的错误展示应该由顶层展示？
            // 但这里既然由 status，其实也就说明了肯定由 msg 字段了
            // 那我为何不直接在这里 msg 展示，而非要在 顶层处理呢？
            if (res.status === 'failed') {
                // 后台保证返回一个 msg 字段，并且该字段是 i18n 格式。
                msgError(res.msg)

                // 50008: 非法的 token
                // 50014: token 已过期
                if (
                    [50008, 50014].includes(res.code) &&
                    response.config.url !== '/api/user/info'
                ) {
                    const userStore = useUserStore()
                    ;(async () => {
                        await userStore.logout()
                        window.location.reload()
                    })()
                }
                // 出错时，我们的目的有两个
                // 一个是展示错误信息
                // 还有一个是通知顶层应用，该请求出错了，后续的步骤不能继续下去
                return Promise.reject(res)
            }
            return res
        },
        (error) => {
            // 这里是非 2xx 状态码

            msgError(error.msg || 'api.error.request')
            return Promise.reject(error)
        },
    )
}
