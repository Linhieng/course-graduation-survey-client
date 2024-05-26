import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { SurveyListStore } from './types';
import { type SearchSurveyByPageBody, searchSurveyByPage, updateOneSurvey as apiUpdateOneSurvey } from '@/api/survey';
import { msgSuccess } from '@/utils/msg';

const useSurveyListStore = defineStore('survey-list', () => {
    const state = reactive<SurveyListStore>({
        loading: {
            searching: false,
        },
        updateData: {
            surveyId: undefined,
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
            pageSize: 5,
        },
    });

    /** 根据条件搜索问卷，可以支持分页搜索 */
    let pre_data: SearchSurveyByPageBody = {};
    async function searchSurveyList(data?: SearchSurveyByPageBody) {
        if (data === undefined) data = pre_data;
        pre_data = data;
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

    async function updateOneSurvey() {
        if (!state.updateData.surveyId) return;
        const res = await apiUpdateOneSurvey({
            surveyId: state.updateData.surveyId,
            title: state.updateData.title,
            comment: state.updateData.comment,
        });
        if (res.ok) {
            msgSuccess('更新成功');
        }
    }

    return {
        state,
        searchSurveyList,
        updateOneSurvey,
    };
});

export default useSurveyListStore;
