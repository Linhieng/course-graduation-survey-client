import type { SurveyQuestionType } from '@/types'
import {
    SURVEY_TYPE_INPUT_CONTENT,
    SURVEY_TYPE_SINGLE_SELECT,
    SURVEY_TYPE_MULTI_SELECT,
} from '@/constants'

/**
 * 问题类型映射为文本提示
 *
 * @param type
 */
export function SurveyQuestionTypeMappingText(type: SurveyQuestionType) {
    if (type === SURVEY_TYPE_INPUT_CONTENT) return '主观输入题'
    if (type === SURVEY_TYPE_SINGLE_SELECT) return '单选题'
    if (type === SURVEY_TYPE_MULTI_SELECT) return '多选题'

    return '未知'
}
