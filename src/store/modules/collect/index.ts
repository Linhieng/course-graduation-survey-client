import { getAnswerCollectBySurveyId, searchSurveyListByPage } from '@/api/collect';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { CollectStore } from './types';
import UAParser from 'ua-parser-js';
import { downloadFile, getTimeDesc } from './util';
import { SearchParams } from '@/views/collect/entry/index.vue';
import { msgError } from '@/utils/msg';
import { getSurveyById } from '@/api/survey';
import ExcelJS from 'exceljs';

const useCollectStore = defineStore('collect', () => {
    const state = reactive<CollectStore>({
        loading: {
            fetchAnswerCollectBySurveyId: false,
            fetchSurveyListByPage: false,
            fetchSurveyById: false,
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
            survey: {
                id: undefined,
                title: '',
                comment: '',
                questionList: [],
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
        fetchSurveyById();

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
                if (ua.getOS().name) {
                    // @ts-ignore
                    item.user_os = ua.getOS().name;
                    if (ua.getOS().name === 'Windows') item.user_os_flag = '0';
                    else if (ua.getOS().name === 'Android') item.user_os_flag = '1';
                    else if (ua.getOS().name === 'iOS' || ua.getOS().name === 'Mac OS') item.user_os_flag = '2';
                    else if (ua.getOS().name === 'Linux') item.user_os_flag = '3';
                } else {
                    item.user_os = '未知';
                    item.user_os_flag = '4';
                }

                // item.user_os = ua.getOS().name || '未知';
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

    async function fetchSurveyById(surveyId?: number) {
        const id = surveyId || state.cur.surveyId;
        if (!id) {
            msgError('未找到问卷 id');
            return;
        }

        if (state.loading.fetchSurveyById) return;
        state.loading.fetchSurveyById = true;

        const res = await getSurveyById(id);
        if (res.ok) {
            state.cur.survey.id = res.data.id;
            state.cur.survey.title = res.data.title;
            state.cur.survey.comment = res.data.comment;
            state.cur.survey.questionList = res.data.structure_json.questionList;
        }

        state.loading.fetchSurveyById = false;
    }

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

    /** 导出问卷收集到的答案 */
    async function exportAnswerList(excelFileType: 'xlsx' | 'csv' = 'xlsx') {
        if (!state.cur.surveyId) return;
        if (state.loading.fetchSurveyById) return;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('问卷收集到的答案');

        // 浏览器中使用时，addRow 不生效，得用 getCell 的方式添加。
        // 写入表头
        const presetCol = 3; // 预留三个列
        worksheet.getCell(1, 1).value = 'IP 来源';
        worksheet.getCell(1, 2).value = '提交时间';
        worksheet.getCell(1, 3).value = '是否有效';
        state.cur.survey.questionList.forEach((item, i) => {
            worksheet.getCell(1, presetCol + i + 1).value = item.order + 1 + item.title;
        });
        // 写入具体内容。
        state.cur.answerList.forEach((item, i) => {
            const row = i + 2;

            worksheet.getCell(row, 1).value = item.ip_from;
            worksheet.getCell(row, 2).value = item.created_date;
            worksheet.getCell(row, 3).value = item.is_valid_text;
            item.answer_structure_json.data.forEach((ans, i) => {
                if (ans.type === 'single_text' || ans.type === 'multi_text')
                    worksheet.getCell(row, presetCol + i + 1).value = ans.text;
                if (ans.type === 'single_select' || ans.type === 'multi_select') {
                    worksheet.getCell(row, presetCol + i + 1).value = ans.option_text
                        .map(({ text }) => text)
                        .join('; ');
                }
            });
        });
        const buffer = await workbook[excelFileType].writeBuffer();
        downloadFile(buffer, state.cur.title + '.' + excelFileType, excelFileType === 'csv');
    }

    return {
        state,
        fetchAnswerCollectBySurveyId,
        fetchAnswerCollectByPage,
        fetchSurveyById,
        fetchSurveyListByPage,
        exportAnswerList,
    };
});
export default useCollectStore;
