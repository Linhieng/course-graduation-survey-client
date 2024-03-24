import { get, post } from "."

const urlAnswerGetSurvey = '/answer/'

export function apiAnswerGetSurvey(surveyId: number) {
    return get(urlAnswerGetSurvey + surveyId)
}
