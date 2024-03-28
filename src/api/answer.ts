import type { ResPro, SurveyQuestion } from "@/types"
import { get, post } from "."

const urlAnswerGetSurvey = '/answer/'

interface AnswerGetSurvey {
    id: number
    title: string
    comment: string
    questions: {
        version: '0.1.0',
        questions: SurveyQuestion[]
    }
}

export function apiAnswerGetSurvey(surveyId: number): ResPro<AnswerGetSurvey> {
    return get(urlAnswerGetSurvey + surveyId)
}
