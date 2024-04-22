import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { StatStore } from './types';
import {
    getStatCount as apiGetStatCount,
    getGroupByDay as apiGetGroupByDay,
    getAnswerVisitGroupByDay,
} from '@/api/stat';

const useStatStore = defineStore('stat', () => {
    const state = reactive<StatStore>({
        loading: {
            fetchGroupByDay: false,
            fetchAnswerVisitGroupByDay: false,
        },
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
        statGroupByDay: {
            xAxis: [],
            data: [
                { name: '创建问卷', key: 'create_survey', count: 0, value: [] },
                { name: '发布问卷', key: 'publish_survey', count: 0, value: [] },
                { name: '问卷草稿', key: 'draft_survey', count: 0, value: [] },
                { name: '停止收集', key: 'stop_survey', count: 0, value: [] },
                { name: '删除问卷', key: 'del_survey', count: 0, value: [] },
            ],
        },
        statAnswerVisitGroupByDay: {
            chartData: [],
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

    async function fetchGroupByDay() {
        if (state.loading.fetchGroupByDay) return;
        state.loading.fetchGroupByDay = true;
        const res = await apiGetGroupByDay();
        if (res.ok) {
            state.statGroupByDay = res.data;
        }
        state.loading.fetchGroupByDay = false;
    }

    async function fetchAnswerVisitGroupByDay() {
        if (state.loading.fetchAnswerVisitGroupByDay) return;
        state.loading.fetchAnswerVisitGroupByDay = true;
        const res = await getAnswerVisitGroupByDay();
        if (res.ok) {
            state.statAnswerVisitGroupByDay = res.data;
        }
        state.loading.fetchAnswerVisitGroupByDay = false;
    }

    return {
        state,
        getStatCount,
        fetchGroupByDay,
        fetchAnswerVisitGroupByDay,
    };
});
export default useStatStore;
