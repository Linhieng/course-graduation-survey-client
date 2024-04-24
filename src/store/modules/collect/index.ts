import { getAnswerCollectBySurveyId, searchSurveyListByPage } from '@/api/collect';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { CollectStore } from './types';
import UAParser from 'ua-parser-js';
import { getTimeDesc } from './util';
import { SearchParams } from '@/views/collect/entry/index.vue';

const useCollectStore = defineStore('collect', () => {
    const state = reactive<CollectStore>({
        loading: {
            fetchAnswerCollectBySurveyId: false,
            fetchSurveyListByPage: false,
        },
        // local: {

        // },
        cur: {
            title: '',
            desc: '',
            surveyId: undefined,
            answerList: [],
            questionList: [],
            pageAnswerList: {
                total: 0,
                pageStart: 1,
                pageSize: 10,
                list: [],
            },
        },
        search_survey: {
            pagination: {
                total: 0,
                current: 1,
                pageSize: 5,
            },
            survey_list: [],
        },
    });

    /** 获取问卷的答案答案统计 */
    async function fetchAnswerCollectBySurveyId(surveyId?: number) {
        if (state.loading.fetchAnswerCollectBySurveyId) return;
        if (!isNaN(Number(surveyId))) {
            state.cur.surveyId = surveyId;
        }
        if (!state.cur.surveyId) return;

        state.loading.fetchAnswerCollectBySurveyId = true;

        const res = await getAnswerCollectBySurveyId(state.cur.surveyId);
        if (res.ok) {
            res.data.answerList.forEach((item) => {
                const ua = new UAParser().setUA(item.user_agent);

                if (ua.getBrowser().name) {
                    // @ts-ignore
                    item.user_browser = ua.getBrowser().name;
                    if (ua.getBrowser().name === 'Edge') item.user_browser_flag = '0';
                    else if (ua.getBrowser().name === 'Chrome') item.user_browser_flag = '1';
                    else if (ua.getBrowser().name === 'Firefox') item.user_browser_flag = '2';

                    item.user_browser += ua.getBrowser().version?.split('.').slice(0, 1);
                } else {
                    item.user_browser = '未知';
                    item.user_browser_flag = '3';
                }

                item.user_os = ua.getOS().name || '未知';
                item.user_device = ua.getDevice().vendor || '未知';
                item.created_at = new Date(item.created_at);
                item.created_date = item.created_at.toLocaleString();
                item.is_valid_text = item.is_valid === 1 ? '有效' : '无效';
                item.spend_time_text = item.spend_time < 1 ? '未记录' : getTimeDesc(item.spend_time);
            });

            state.cur.title = res.data.title;
            state.cur.desc = res.data.desc;
            state.cur.answerList = res.data.answerList;
        }

        state.loading.fetchAnswerCollectBySurveyId = false;
    }

    async function fetchAnswerCollectByPage(pageStart: number, pageSize: number, surveyId?: number) {}

    /** 分页获取问卷列表 */
    async function fetchSurveyListByPage({ current, searchParams }: { current: number; searchParams: SearchParams }) {
        if (state.loading.fetchSurveyListByPage) return;
        if (
            searchParams.survey_create_range &&
            searchParams.survey_create_range[0] !== '' &&
            searchParams.survey_create_range[1] !== ''
        ) {
            searchParams.survey_create_range = [
                // 后台期待接收一个时间戳
                new Date(searchParams.survey_create_range[0]).getTime(),
                new Date(searchParams.survey_create_range[1]).getTime(),
            ];
        }

        state.loading.fetchSurveyListByPage = true;
        const res = await searchSurveyListByPage(current, state.search_survey.pagination.pageSize, searchParams);
        if (res.ok) {
            console.log(res.data.survey_list);
            res.data.survey_list.forEach((item) => {
                item.is_valid = (item.is_valid as any as number) === 1;
            });
            state.search_survey.pagination.total = res.data.total;
            state.search_survey.pagination.pageSize = res.data.pageSize;
            state.search_survey.pagination.current = res.data.pageStart;
            state.search_survey.survey_list = res.data.survey_list;
        }
        state.loading.fetchSurveyListByPage = false;
    }

    return {
        state,
        fetchAnswerCollectBySurveyId,
        fetchAnswerCollectByPage,
        fetchSurveyListByPage,
    };
});
export default useCollectStore;
