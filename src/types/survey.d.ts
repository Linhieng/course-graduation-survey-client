import {
    SURVEY_TYPE_INPUT_CONTENT,
    SURVEY_TYPE_SINGLE_SELECT,
    SURVEY_TYPE_MULTI_SELECT
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
    questions: SurveyQuestion[]
}

/**
 * 一道问题
 */
export type SurveyQuestion = {
    [Type in SurveyQuestionType]: {
        id: string,
        isRequired: boolean,
        order: number,
        questionType: Type,
        questionContent: {
            'input_content': InputContent,
            'single_select': SingleSelect,
            'multi_select': MultiSelect,
        }[Type] | QuestionContentType
    }
}[SurveyQuestionType]

/**
 * 支持的问题类型
 */
type SurveyTypeInputContent = typeof SURVEY_TYPE_INPUT_CONTENT
type SurveyTypeSingleSelect = typeof SURVEY_TYPE_SINGLE_SELECT
type SurveyTypeMultiSelect = typeof SURVEY_TYPE_MULTI_SELECT
export type SurveyQuestionType =
    SurveyTypeInputContent |
    SurveyTypeSingleSelect |
    SurveyTypeMultiSelect

export type QuestionContentType = InputContent |  SingleSelect | MultiSelect

/**
 * 主观填空题
 */
interface InputContent {
    title: string
    describe: string
}
/**
 * 单选题
 */
interface SingleSelect {
    titles: InputContent[]
    options: string[]
}
/**
 * 多选题，同单选题一样
 */
type MultiSelect = SingleSelect

// 问卷中问题的结构
export interface SurveyQuestionStruct {
    id: string // 用于 vue 的 :key 。注意，不能将 order 作为 key
    order: number // 序号
    type: SurveyQuestionType // 问题类型
    content: Record<string, any> // 问题信息
}
