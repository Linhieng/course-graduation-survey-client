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

/**
 *
 * @param pageStart 前端是从 1 开始，后端会进行 -1 处理
 * @param pageSize
 * @param searchParams 其中的时间范围应该是一个时间戳数组
 * @returns
 */
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
