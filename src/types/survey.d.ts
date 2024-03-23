
// 问卷中问题的结构
export interface SurveyQuestionStruct {
    id: string // 用于 vue 的 :key 。注意，不能将 order 作为 key
    order: number // 序号
    type: SurveyQuestionType // 问题类型
    content: Record<string, any> // 问题信息
}

// 问卷中问题的类型
export type SurveyQuestionType =
    typeof import('../constants').SURVEY_TYPE_INPUT_CONTENT |
    typeof import('../constants').SURVEY_TYPE_SINGLE_SELECT |
    typeof import('../constants').SURVEY_TYPE_MULTI_SELECT
