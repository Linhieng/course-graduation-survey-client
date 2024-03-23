import type { ResProGetAllSurveys, ResProNewSurvey } from "@/types"
import { get, post } from "."

const urlGetAllSurveys = '/survey/get-all-surveys'
const urlNewSurvey = '/survey/create'

export function apiGetAllSurveys(): ResProGetAllSurveys {
    return get(urlGetAllSurveys)
}

export function apiNewSurvey(): ResProNewSurvey {
    return post(urlNewSurvey)
}
