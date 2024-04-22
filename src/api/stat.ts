import { StatAnswerVisitGroupByDay, StatCount, StatGroupByDay } from '@/store/modules/stat/types';
import { get } from './axios';

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
