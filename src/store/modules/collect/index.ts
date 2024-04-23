import { getAnswerCollectBySurveyId } from '@/api/collect';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { CollectStore } from './types';
import UAParser from 'ua-parser-js';

const useCollectStore = defineStore('collect', () => {
    const state = reactive<CollectStore>({
        loading: {
            fetchAnswerCollectBySurveyId: false,
        },
        // local: {

        // },
        cur: {
            title: '',
            desc: '',
            surveyId: undefined,
            answerList: [],
            pageAnswerList: {
                total: 0,
                pageStart: 1,
                pageSize: 10,
                list: [],
            },
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
            res.data.answerList.forEach((item) => {
                const ua = new UAParser().setUA(item.user_agent);

                if (ua.getBrowser().name) {
                    // @ts-ignore
                    item.user_browser = ua.getBrowser().name;
                    item.user_browser += ua.getBrowser().version?.split('.').slice(0, 1);
                } else {
                    item.user_browser = '未知';
                }

                item.user_os = ua.getOS().name || '未知';
                item.user_device = ua.getDevice().vendor || '未知';
                item.created_date = new Date(item.created_at).toLocaleString();
                item.is_valid_text = item.is_valid === 1 ? '有效' : '无效';
                item.spend_time_text = item.spend_time < 1 ? '未记录' : `大约${~~(item.spend_time / 60)}分钟`;
            });

            state.cur.title = res.data.title;
            state.cur.desc = res.data.desc;
            state.cur.answerList = res.data.answerList;
        }

        state.loading.fetchAnswerCollectBySurveyId = false;
    }

    async function fetchAnswerCollectByPage(pageStart: number, pageSize: number, surveyId?: number) {}

    return {
        state,
        fetchAnswerCollectBySurveyId,
        fetchAnswerCollectByPage,
    };
});
export default useCollectStore;
