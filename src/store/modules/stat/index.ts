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
            count_all_visit: 99999,
            count_all_answer: 99999,
            count_all_survey: 99999,
            count_draft_survey: 99999,
            count_publish_survey: 99999,
            count_stop_survey: 99999,
            today_count_answer_survey: 99999,
            today_count_create_survey: 99999,
            today_count_publish_survey: 99999,
        },
    });

    let timer = setInterval(() => {
        for (const key in state.statCount) {
            state.statCount[key] = Math.random() * 10000;
        }
    }, 1800);

    async function getStatCount() {
        if (state.isFetching) return;
        state.isFetching = true;
        const res = await apiGetStatCount();
        clearInterval(timer);
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
