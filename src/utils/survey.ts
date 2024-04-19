import type { OneSurvey, SurveyQuestionType } from '@/types'
import {
    SURVEY_TYPE_INPUT_CONTENT,
    SURVEY_TYPE_SINGLE_SELECT,
    SURVEY_TYPE_MULTI_SELECT,
} from '@/constants'
import locale from '@/locale'
import { copyToClipboard, msgSuccess } from '.'

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

/** 拷贝问卷链接 */
export const copyLink = (survey: OneSurvey) => {
    let link = import.meta.env.VITE_SURVEY_BASE_URL as string
    if (link.endsWith('/')) {
        link += survey.id
    } else {
        link += '/' + survey.id
    }
    copyToClipboard(link)
    msgSuccess('view.survey.publish.success-copy')
}
