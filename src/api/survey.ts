import type { ResProCacheSurvey, ResProGetAllSurveys, ResProNewSurvey, ResProGetSurveyById } from "@/types"
import { get, post } from "."
import type { ReqSurveyAche } from "@/types/request"
import type { AxiosRequestConfig } from "axios"

const urlGetAllSurveys = '/survey/get-all-surveys'
const urlNewSurvey = '/survey/create'
const urlAcheSurvey = '/survey/cache'
const urlGetSurveyById = 'survey/id-'
const urlToggleSurveyDelete = 'survey/toggle-del/'
const urlToggleSurveyValid = 'survey/toggle-valid/'

export function apiGetAllSurveys(): ResProGetAllSurveys {
    return get(urlGetAllSurveys)
}

export function apiNewSurvey(): ResProNewSurvey {
    return post(urlNewSurvey)
}

export function apiCacheSurvey(data: ReqSurveyAche): ResProCacheSurvey {
    return post(urlAcheSurvey, { data })
}

export function apiGetSurveyById(surveyId: number): ResProGetSurveyById {
    return get(urlGetSurveyById + surveyId)
}

export function apiToggleSurveyDelete(surveyId: number, isDel?: boolean) {
    let del
    if (typeof del === 'boolean') {
        del = isDel ? 1 : 0
    }
    return post(urlToggleSurveyDelete + surveyId, {
        params: { del }
    })
}

export function apiToggleSurveyValid(surveyId: number, isValid?: boolean) {
    let valid
    if (typeof isValid === 'boolean') {
        valid = isValid ? 1 : 0
    }
    return post(urlToggleSurveyValid + surveyId, {
        params: { valid }
    })
}
