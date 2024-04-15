import type { ResPro, SurveyQuestion } from '@/types'
import { get, post } from './axios'

interface AnswerGetSurvey {
    id: number
    title: string
    comment: string
    questions: {
        version: '0.1.0'
        questions: SurveyQuestion[]
    }
}

interface ReqSurveyAnswer {
    surveyId: number
    // answerUserId: number
    /** 单位秒 */
    spendTime: number
    /** 问题回答的内容，数据库中仅保存，不解析 */
    answerDetail: Object
}

export function apiAnswerGetSurvey(surveyId: number) {
    return get<AnswerGetSurvey>('/api/answer/' + surveyId)
}

export function apiAnswerPost(surveyId: number, data: ReqSurveyAnswer) {
    return post('/api/answer/' + surveyId, { data })
}
