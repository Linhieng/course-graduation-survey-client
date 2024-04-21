import { QuestionItem } from '@/store/modules/create/types';
import { post } from './axios';

export function cacheSurvey(data: ApiCacheSurveyData) {
    return post<{
        surveyId: number;
        time: Date;
    }>('/api/survey/cache', data);
}

// prettier-ignore
export function publishSurvey(surveyId: number) { return post(`/api/survey/publish/${surveyId}`) }
// prettier-ignore
export function stopSurvey(surveyId: number) { return post(`/api/survey/stop/${surveyId}`) }
// prettier-ignore
export function delSurvey(surveyId: number) { return post(`/api/survey/del/${surveyId}`) }
// prettier-ignore
export function recoverSurvey(surveyId: number) { return post(`/api/survey/recover/${surveyId}`) }

//
//
//
//
//
//
//
//
/** 缓存问卷，问卷不存在时自动创建 */
export interface ApiCacheSurveyData {
    surveyId?: number;
    title: string;
    comment: string;
    structure_json: StructureJson;
}
export interface StructureJson {
    version: '0.2.0';
    questionList: QuestionItem[];
}
