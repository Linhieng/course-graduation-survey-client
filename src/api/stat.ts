import { StatCount, StatGroupByDay } from '@/store/modules/stat/types';
import { get } from './axios';

export function getStatCount() {
    return get<StatCount>('/api/stat/count-stat');
}
export function getGroupByDay() {
    return get<StatGroupByDay>('/api/stat/group-by-day');
}
