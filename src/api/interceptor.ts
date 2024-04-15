import { useUserStore } from '@/store'
import { getToken } from '@/utils/auth'
import { msgError } from '@/utils'
import type { AxiosError, AxiosInstance } from 'axios'
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

// /**
//  * 这里要做错误处理吗？如果要做，那么需要捕获哪些错误？
//  * 通过在这里捕获这些错误，带来了什么好处吗？
//  *
//  *      好处：组件中能处理的错误，是根据业务来的，比如注册时的错误如果是用户已存在，则这种错误应该交给组件处理。
//  *      但是每个错误是不适合组件处理的，或者说，有些错误是通用的，如果让组件单独处理的话，重复的代码很特别多
//  *      比如请求失败/无网络时，前端根本不会获得任何后端返回的数据，这个时候就可以在这里自行封装一个响应对象
//  *      该响应对象和通用响应对象保持一致。
//  *
//  *      总的来说，这里要做错误处理，目的是为了让组件中能够只收到一个统一的对象，这样可以减轻组件中代码的编写
//  */
// async function axiosRequest({
//     method,
//     url,
//     data,
//     ...config
// }: AxiosRequestConfig<any>) {
//     try {
//         const response = (await axiosInstance({
//             method,
//             url,
//             data,
//             ...config,
//         })) as HttpResponse
//         // token = response.headers['x-token']
//         // userId = response.headers['x-userid']
//         // username = response.headers['x-username']
//         return response
//     } catch (error: any) {
//         // 这里的逻辑需要重新思考一下。
//         // 在此之前，我的想法是，当请求错误/失败时，我都让这个请求不报错。
//         // 让它始终返回一个固定格式的对象。
//         // 然后具体的错误处理都是根据这个格式对象来处理的。
//         // 这样一来，我在实际代码中就不需要 try catch
//         // 但这种做法真的好吗？我不知道，因为我发现 arco 开源项目中，它是通过 try catch
//         // 捕获错误的。

//         // 也许，我这里可以继续封装，但是封装后，我应该通过 throw 的方式再次抛出。
//         // 而不是直接 return 一个对象
//         // 也就是说，我应该让错误“冒泡”到组件，由组件进行处理。
//         // 但这样不是很麻烦吗？如果中间层级过多，那岂不是每一个层级都需要 try catch，
//         // 然后 throw ？
//         console.error('❌请求错误：', error)
//         const resData: HttpResponse = {
//             status: 'failed',
//             code: CODE_UNKNOWN_ERROR,
//             msg: '未知错误',
//             data: error as any,
//         }
//         if (error.__proto__.constructor.name !== 'AxiosError') {
//             return resData
//         }
//         const e = error as AxiosError
//         if (e.response) {
//             // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
//             // @ts-ignore
//             if (e.response.data?.data) {
//                 return e.response.data
//             }
//             return resData
//         } else if (e.request) {
//             // 请求已经成功发起，但没有收到响应
//             resData.msg = 'api.error.not-response'
//         } else {
//             // 发送请求时出了点问题
//             resData.msg = 'api.error.request'
//         }
//         return resData
//     }
// }

export function interceptResponse(axios: AxiosInstance) {
    axios.interceptors.response.use(
        // @ts-ignore
        (response) => {
            const res = response.data as HttpResponse
            if (res.status === 'succeed') {
                res.ok = true
                return res
            }
            res.ok = false

            // 现在是错误处理时间！虽然是错误处理，但这里不会抛出 reject，而是始终抛出一个
            // 固定的对象，也就是说，顶层中只能通过该对象中的每个属性来判断请求是否成功
            // 而不是通过 try catch 的方式
            // 突然发现这一点不就是和 fetch api 一样吗？不会根据状态码是非 2xx，就置为 reject
            // 只不过我这里更极端，直接没有 reject 的状态，全部都是 resolve
            //

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
            if ()

            const response = (error as AxiosError).response?.data
            console.log('❌❌', )
            // 这里是非 2xx 状态码
            // res.ok = false

            msgError(error.msg || 'api.error.request')
            return Promise.reject(error)
        },
    )
}
