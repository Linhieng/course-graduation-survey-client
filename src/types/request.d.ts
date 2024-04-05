/**
 * @file 发送请求时需要的请求体类型都在这里
 */

import type { SurveyQuestion } from '.'

/**
 * 请求体允许的类型
 */
type ReqAllowType = ReqUserLogin | ReqUserSignup | ReqSurveyAche

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

/**
 * 缓存问卷信息的请求体
 */
interface ReqSurveyAche {
    id: TypeID
    title: string
    comment: string
    /** 这里数据库只负责储存，不负责解析，也就是说该内容由前端生成，同时也由前端解析 */
    structure_json: Structure_Json
}
// 注意这里的数据，和实际的 Survey 中的格式有些不同，所以处理时需要对其进行转换
export type Structure_Json = {
    version: '0.1.0'
    questions: SurveyQuestion[]
}
