import { get } from '.'

export function apiGetStatData(surveyId: number) {
    return get('/stat/' + surveyId)
}
