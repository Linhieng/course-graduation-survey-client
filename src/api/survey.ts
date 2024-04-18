import type { OneSurvey, ResProGetSurveyById } from '@/types'
import { get, post } from './axios'
import type { ReqSurveyAche } from '@/types/request'

const urlGetSurveyById = 'survey/id-'
const urlToggleSurveyDelete = 'survey/toggle-del/'
const urlToggleSurveyValid = 'survey/toggle-valid/'

export function apiGetAllSurveys(userId?: number) {
    return get<{ all_surveys: OneSurvey[] }>(
        `/api/survey/get-all-surveys/${userId || ''}`,
    )
}

export function apiNewSurvey() {
    return post<{ surveyId: number }>('/api/survey/create')
}

export function apiCacheSurvey(data: ReqSurveyAche) {
    return post<{ time: string }>('/api/survey/cache', data)
}

export function apiGetSurveyById(surveyId: number): ResProGetSurveyById {
    // TODO: 校验返回的响应体是否符合要求
    return get(urlGetSurveyById + surveyId)
}

export function apiToggleSurveyDelete(surveyId: number, isDel?: boolean) {
    let del
    if (typeof del === 'boolean') {
        del = isDel ? 1 : 0
    }
    return post(urlToggleSurveyDelete + surveyId, {
        params: { del },
    })
}

export function apiToggleSurveyValid(surveyId: number, isValid?: boolean) {
    let valid
    if (typeof isValid === 'boolean') {
        valid = isValid ? 1 : 0
    }
    return post(urlToggleSurveyValid + surveyId, {
        params: { valid },
    })
}
