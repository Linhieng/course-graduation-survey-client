import { get } from "."

const urlGetAllSurveys = '/survey/get-all-surveys'

export function apiGetAllSurveys() {
    return get(urlGetAllSurveys)
}
