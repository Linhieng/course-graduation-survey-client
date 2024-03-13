/**
 * @file 发送请求时需要的请求体类型都在这里
 */

/**
 * 请求体允许的类型
 */
type ReqAllowType = ReqUserLogin | ReqUserSignup

/**
 * 用户登录时需要的请求参数
 */
interface ReqUserLogin {
    username: string
    password: string
}

/**
 * 用户注册时需要的请求参数
 */
interface ReqUserSignup {
    username: string
    password: string
    email?: string
}
