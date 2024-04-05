import {
    SURVEY_TYPE_INPUT_CONTENT,
    SURVEY_TYPE_SINGLE_SELECT,
    SURVEY_TYPE_MULTI_SELECT,
} from '../constants'

/**
 * 层级划分说明：
 * 一份 Survey 中有多道 SurveyQuestion
 * 一个 SurveyQuestion，不同的问题，会有不同的内容结构
 */

/**
 * 一份问卷
 */
export interface Survey {
    id: number
    title: string
    comment: string
    version?: '0.1.0'
    questions: SurveyQuestion[]
}

/**
 * 一份问卷 ——> 一道问题
 */
export type SurveyQuestion =
    | SurveyQuestion_Text
    | SurveyQuestion_SingleSelect
    | SurveyQuestion_MultiSelect
/* 虽然这种方法笨，但耐不住它易读啊，而且管用！ */
export interface SurveyQuestion_Text {
    id: string
    isRequired: boolean
    order: number
    questionType: SurveyQuestionType_Text
    questionContent: SurveyQuestionContent_Text
}
export interface SurveyQuestion_SingleSelect {
    id: string
    isRequired: boolean
    order: number
    questionType: SurveyQuestionType_SingleSelect
    questionContent: SurveyQuestionContent_SingleSelect
}
export interface SurveyQuestion_MultiSelect {
    id: string
    isRequired: boolean
    order: number
    questionType: SurveyQuestionType_MultiSelect
    questionContent: SurveyQuestionContent_MultiSelect
}

/**
 * 一份问卷 ——> 一道问题 ——> 支持的问题类型
 */
type SurveyQuestionType_Text = typeof SURVEY_TYPE_INPUT_CONTENT
type SurveyQuestionType_SingleSelect = typeof SURVEY_TYPE_SINGLE_SELECT
type SurveyQuestionType_MultiSelect = typeof SURVEY_TYPE_MULTI_SELECT
export type SurveyQuestionType =
    | SurveyQuestionType_Text
    | SurveyQuestionType_SingleSelect
    | SurveyQuestionType_MultiSelect

/**
 * 一份问卷 ——> 一道问题 ——> 支持的问题内容
 */
export type SurveyQuestionContent =
    | SurveyQuestionContent_Text
    | SurveyQuestionContent_SingleSelect
    | SurveyQuestionContent_MultiSelect
/**
 * 一份问卷 ——> 一道问题 ——> 问题内容为：主观填空题
 */
interface SurveyQuestionContent_Text {
    title: string
    describe: string
}
/**
 * 一份问卷 ——> 一道问题 ——> 问题内容为：单选题
 */
interface SurveyQuestionContent_SingleSelect {
    titles: Array<{
        id: string
        title: string
        describe: string
    }>
    options: string[]
}
/**
 * 一份问卷 ——> 一道问题 ——> 问题内容为：多选题（同单选题）
 */
type SurveyQuestionContent_MultiSelect = SurveyQuestionContent_SingleSelect
