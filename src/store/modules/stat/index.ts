import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { StatCount, StatStore } from './types';
import { getStatCount as apiGetStatCount } from '@/api/stat';
import { msgError } from '@/utils/msg';
import { useMyRequest } from '@/api/hook';

const useStatStore = defineStore('stat', () => {
    const state = reactive<StatStore>({
        isFetching: false,
        statCount: {
            count_all_visit: -1,
            count_all_answer: -1,
            count_all_survey: -1,
            count_draft_survey: -1,
            count_publish_survey: -1,
            count_stop_survey: -1,
            today_count_answer_survey: -1,
            today_count_create_survey: -1,
            today_count_publish_survey: -1,
        },
    });

    async function getStatCount() {
        if (state.isFetching) return;
        state.isFetching = true;
        const res = await apiGetStatCount();
        if (res.ok) {
            state.statCount = res.data;
        }
        state.isFetching = false;
    }

    return {
        state,
        getStatCount,
    };
});
export default useStatStore;
