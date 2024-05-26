import { post } from './axios';

export function changeAnswerValid(data: { ids: number[]; status: 0 | 1 }) {
    return post('/api/answer/set-valid', data);
}
