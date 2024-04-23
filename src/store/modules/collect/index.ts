import { getAnswerCollectBySurveyId } from '@/api/collect';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { CollectStore } from './types';

const useCollectStore = defineStore('collect', () => {
    const state = reactive<CollectStore>({
        loading: {
            fetchAnswerCollectBySurveyId: false,
        },
        cur: {
            surveyId: undefined,
            answerList: [],
        },
    });

    /** 获取问卷的答案答案统计 */
    async function fetchAnswerCollectBySurveyId(surveyId?: number) {
        if (state.loading.fetchAnswerCollectBySurveyId) return;
        if (surveyId) {
            state.cur.surveyId = surveyId;
        }
        if (!state.cur.surveyId) return;

        state.loading.fetchAnswerCollectBySurveyId = true;

        const res = await getAnswerCollectBySurveyId(state.cur.surveyId);
        if (res.ok) {
            state.cur.answerList = res.data.answerList;
        }

        state.loading.fetchAnswerCollectBySurveyId = false;
    }

    return {
        state,
        fetchAnswerCollectBySurveyId,
    };
});
export default useCollectStore;
