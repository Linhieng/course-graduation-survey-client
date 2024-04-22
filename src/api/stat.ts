import { StatCount } from '@/store/modules/stat/types';
import { get } from './axios';

export function getStatCount() {
    return get<StatCount>('/api/stat/count-stat');
}
