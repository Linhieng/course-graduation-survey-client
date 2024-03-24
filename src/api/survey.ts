import type { ResProCacheSurvey, ResProGetAllSurveys, ResProNewSurvey, ResProGetSurveyById } from "@/types"
import { get, post } from "."
import type { ReqSurveyAche } from "@/types/request"

const urlGetAllSurveys = '/survey/get-all-surveys'
const urlNewSurvey = '/survey/create'
const urlAcheSurvey = '/survey/cache'
const urlGetSurveyById = 'survey/id-'

export function apiGetAllSurveys(): ResProGetAllSurveys {
    return get(urlGetAllSurveys)
}

export function apiNewSurvey(): ResProNewSurvey {
    return post(urlNewSurvey)
}

export function apiCacheSurvey(data: ReqSurveyAche): ResProCacheSurvey {
    return post(urlAcheSurvey, {data})
}

export function apiGetSurveyById(surveyId: number): ResProGetSurveyById {
    return post(urlGetSurveyById + surveyId)
}
