import { SearchParams } from '@/views/collect/entry/index.vue';
import { get } from './axios';
import { CollectAnswer, CollectSurveyItem } from '@/store/modules/collect/types';

export function getAnswerCollectBySurveyId(surveyId: number) {
    return get<{
        title: string;
        desc: string;
        answerList: CollectAnswer[];
    }>(`/api/collect/${surveyId}`);
}

export function searchSurveyListByPage(pageStart: number, pageSize: number, searchParams: SearchParams) {
    return get<{
        total: number;
        pageStart: number;
        pageSize: number;
        survey_list: CollectSurveyItem[];
    }>('/api/collect/page/survey_list', {
        params: {
            pageStart,
            pageSize,
            ...searchParams,
        },
    });
}
