/**
 * @file 定义了后台响应体的数据类型
 */

import type { Structure_Json } from './request'


/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* ================================ constant ================================== */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */



/** 只有符合理想情况时才会设置为该值 */
type StatusSucceed = typeof import('../constants').STATUS_SUCCEED
/** 任何不符合理想情况，都设置为 StatusFailed */
type StatusFailed = typeof import('../constants').STATUS_FAILED

/**
 * 响应的状态，只提供两种！
 */
type TypeResStatus = StatusSucceed | StatusFailed


/**
 * - 成功
 */
type TypeResCodeSucceed = typeof import('../constants').CODE_SUCCEED
/**
 * - 操作失败，同时我能知道为什么该操作失败。比如注册时用户名已存在
 */
type TypeResCodeFailed = typeof import('../constants').CODE_FAILED
/**
 * - 操作错误，同时我能知道为什么错误。比如我识别到请求参数格式错误，
 *      通常是 catch 时匹配到我期待的错误类型。
 */
type TypeResCodeError = typeof import('../constants').CODE_ERROR
/**
 * - 未知错误，我不知道为什么出错
 */
type TypeResCodeUnknownError = typeof import('../constants').CODE_UNKNOWN_ERROR
/**
 * 自定的返回码，对操作结果进一步细分。这些数值需要与 constants/response.js 中的 CODE_xx 相对应。
 * 目前来说，这四个值已经足够满足需求了，所以没有特殊情况的话不要再修改
 *  - 操作成功 (0)
 *  - 操作失败 (1)
 *  - 操作错误 (2)
 *  - 未知错误 (3)
 */
type TypeResCode =
    TypeResCodeSucceed |
    TypeResCodeFailed |
    TypeResCodeError |
    TypeResCodeUnknownError


export interface OneSurvey {
    id: number // 16
    title: string // "未命名问卷"
    comment: string // ""
    creator_id: number // 2
    is_deleted: number // 0
    is_draft: number // 1
    is_valid: number // 0
    sort_order: number // 0
    created_at: string // "2024-03-23T12:54:24.000Z"
    updated_at: string // "2024-03-23T12:54:24.000Z"
}

/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* =============================== response data ============================== */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */

export type ResProLogin = ResPro<ResLoginData>
export type ResProSignup = ResPro<ResSignupData>
export type ResProGetAllSurveys = ResPro<ResAllSurveys>
export type ResProNewSurvey = ResPro<ResNewSurvey>
export type ResProCacheSurvey = ResPro<ResCacheSurvey>
export type ResProGetSurveyById = ResPro<ResGetSurveyById>

/**
 * 登录接口响应的数据
 */
interface ResLoginData {
    id: TypeID
    username: string
}

/**
 * 注册接口响应的数据
 */
interface ResSignupData {
    id: TypeID
    username: string
}

/**
 * 获取所有问卷接口的响应 data
 */
interface ResAllSurveys {
    all_surveys: OneSurvey[]
}

/**
 * 新建一份问卷时返回的数据内容
 */
interface ResNewSurvey {
    surveyId: number
}

/**
 * 缓存问卷时响应的数据
 */
interface ResCacheSurvey {
    time: string
}

/**
 * 获取一份问卷返回的响应体
 */
interface ResGetSurveyById {
    id: number
    title: string
    comment: string
    questions: Structure_Json
}
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* =============================== basic type ================================= */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */


/**
 * 由于都是异步请求，所以直接提供一个类型别名，将 Promise 封装起来
 */
export type ResPro<T = ResValidObj> = Promise<ResBase<T>>

type ResValidObj = ResLoginData | ResSignupData | ResAllSurveys | ResNewSurvey | ResGetSurveyById
/**
 * 与后台约定好的通用响应体包装器
 */
export interface ResBase<T extends ResValidObj = ResValidObj> {
    status: TypeResStatus
    code: TypeResCode
    msg: string
    data: T
}
