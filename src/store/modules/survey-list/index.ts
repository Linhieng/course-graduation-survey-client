import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { SurveyListStore } from './types';
import { SearchSurveyByPageBody, searchSurveyByPage } from '@/api/survey';

const useSurveyListStore = defineStore('survey-list', () => {
    const state = reactive<SurveyListStore>({
        loading: {
            searching: false,
        },
        updateData: {
            title: '',
            comment: '',
            status: 1,
            is_template: 0,
        },
        searchResult: {
            pageSize: 10,
            pageStart: 1,
            total: 0,
            survey_list: [],
        },
        searchPage: {
            pageStart: 1,
            pageSize: 10,
        },
    });

    /** 根据条件搜索问卷，可以支持分页搜索 */
    async function searchSurveyList(data: SearchSurveyByPageBody) {
        if (state.loading.searching) return;
        state.loading.searching = true;
        const pageStart = state.searchPage.pageStart;
        const pageSize = state.searchPage.pageSize;
        const res = await searchSurveyByPage({ ...data, pageStart, pageSize });
        if (res.ok) {
            res.data.survey_list.forEach((item) => {
                if (item.is_deleted === 1) {
                    item.status = '已删除';
                } else if (item.is_draft === 1) {
                    item.status = '草稿';
                } else if (item.is_valid === 1) {
                    item.status = '发布中';
                } else {
                    item.status = '已停止';
                }
            });
            state.searchResult = res.data;
        }
        state.loading.searching = false;
    }

    return {
        state,
        searchSurveyList,
    };
});

export default useSurveyListStore;
