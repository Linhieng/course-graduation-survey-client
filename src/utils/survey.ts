import type { SurveyQuestionType } from '@/types'
import {
    SURVEY_TYPE_INPUT_CONTENT,
    SURVEY_TYPE_SINGLE_SELECT,
    SURVEY_TYPE_MULTI_SELECT,
} from '@/constants'
import locale from '@/locale'

const { t } = locale.global
/**
 * 问题类型映射为文本提示
 *
 * @param type
 */
export function SurveyQuestionTypeMappingText(type: SurveyQuestionType) {
    if (type === SURVEY_TYPE_INPUT_CONTENT)
        return t('survey.question.title.input')
    if (type === SURVEY_TYPE_SINGLE_SELECT)
        return t('survey.question.title.single-select')
    if (type === SURVEY_TYPE_MULTI_SELECT)
        return t('survey.question.title.multi-select')

    return '未知'
}
