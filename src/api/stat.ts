import { StatAnswerVisitGroupByDay, StatCount, StatGroupByDay } from '@/store/modules/stat/types';
import { get } from './axios';
import { RankItem } from '@/views/dashboard/workplace/components/popular-content.vue';

export function getStatCount() {
    return get<StatCount>('/api/stat/count-stat');
}
export function getGroupByDay() {
    return get<StatGroupByDay>('/api/stat/group-by-day');
}
export function getAnswerVisitGroupByDay() {
    return get<StatAnswerVisitGroupByDay>(`/api/stat/visit-survey-group-by-day`, {
        params: { day: 8 },
    });
}

export function getSurveyClassifyBase() {
    return get<{
        draft_count: number;
        invalid_count: number;
        valid_count: number;
        deleted_count: number;
        total_count: number;
    }>('/api/stat/survey-classify-easy');
}

export function getPopularStatSurveyAnswerRank() {
    return get<{
        allRank: RankItem[];
        publishRank: RankItem[];
        stopRank: RankItem[];
    }>('/api/stat/popular-survey-count-answer');
}
