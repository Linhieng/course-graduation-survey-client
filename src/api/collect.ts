import { get } from './axios';
import { CollectAnswer } from '@/store/modules/collect/types';

export function getAnswerCollectBySurveyId(surveyId: number) {
    return get<{
        title: string;
        desc: string;
        answerList: CollectAnswer[];
    }>(`/api/collect/${surveyId}`);
}
