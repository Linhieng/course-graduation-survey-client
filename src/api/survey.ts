import { QuestionItem } from '@/store/modules/create/types';
import { post } from './axios';

export function cacheSurvey(data: ApiCacheSurveyData) {
    return post<{
        surveyId: number;
        time: Date;
    }>('/api/survey/cache', data);
}

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
