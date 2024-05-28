import type { QuestionItem, Survey } from '@/store/modules/create/types';
import { get, post } from './axios';
import type { SearchSurveyResult } from '@/store/modules/survey-list/types';

export function searchSurveyByPage(body: SearchSurveyByPageBody) {
    return post<SearchSurveyResult>('/api/survey/searchByPage', body);
}
export interface SearchSurveyByPageBody {
    pageStart?: number;
    pageSize?: number;
    /** 未定义表示不设置条件 */
    title?: string;
    comment?: string;
    /** 不设置表示所有。问卷类型。0 常规问卷，1 调研问卷，2 心理问卷 */
    survey_type?: number;
    /** 不设置表示所有。状态：0 表示删除，1 表示草稿，2 表示发布，3 表示停止 */
    status?: number;
    /** 不设置表示所有。0 表示非模版，1 表示私有模版，2 表示公有模版 */
    is_template?: number;
    /** 不设置表示所有。创建时间范围 */
    created_range?: [number, number];
    /** 不设置表示所有。更新时间范围 */
    updated_range?: [number, number];
    /** 根据什么进行排序 */
    order_by?: Array<'updated_at' | 'created_at' | 'collect_visited' | 'collect_answer'>;
    /** 排序方式，升序还是降序 */
    order_type?: 'DESC' | 'ASC';
}

//
//
//
//
//
//
//
//
//
//
//
//

export function updateOneSurvey(data: { surveyId: number; title: string; comment: string }) {
    return post(`/api/survey/update-one/${data.surveyId}`, data);
}

/** 获取自己的问卷模版，或者他人公开的问卷模版 */
export function getShareSurveyTemplate(surveyId: number) {
    return post<{
        /** 此 id 应该赋值为 undefined */
        id: number;
        creator_id: number;
        is_template: 0 | 1 | 2;
        title: string;
        comment: string;
        sort_order: number;
        is_draft: number;
        is_valid: number;
        is_deleted: number;
        survey_type: 0 | 1 | 2;
        created_at: string;
        updated_at: string;
        structure_json: StructureJson;
        skin: any;
    }>(`/api/survey/get-share-template/${surveyId}`);
}
export function setSurveyToTemplate(surveyId: number) {
    return post(`/api/survey/template/set-share/${surveyId}`);
}
export function setSurveyTemplateShare(surveyId: number) {
    return post(`/api/survey/template/set-share/${surveyId}`);
}
export function setSurveyTemplateUnshare(surveyId: number) {
    return post(`/api/survey/template/set-unshare/${surveyId}`);
}
export function toggleSurveyTemplateShare(surveyId: number) {
    return post(`/api/survey/template/toggle-share/${surveyId}`);
}
export function getSurveyMyTemplate(pageStart?: number, pageSize?: number) {
    return get<{
        count: number;
        pageStart: number;
        pageSize: number;
        surveyTemplate: Array<
            Survey & {
                creator_id: number;
            }
        >;
    }>('/api/survey/my-template', {
        params: { pageStart, pageSize },
    });
}
export function getSurveyAllTemplate(pageStart?: number, pageSize?: number) {
    return get<{
        count: number;
        pageStart: number;
        pageSize: number;
        surveyTemplate: Array<
            Survey & {
                creator_id: number;
            }
        >;
    }>('/api/survey/all-template', {
        params: { pageStart, pageSize },
    });
}

export function getSurveyById(surveyId: number) {
    return get<{
        id: number;
        title: string;
        comment: string;
        survey_type: 0 | 1 | 2;
        is_template: 0 | 1 | 2;
        structure_json: {
            version: '0.2.0';
            questionList: QuestionItem[];
        };
        skin: any;
    }>(`/api/survey/get/${surveyId}`);
}
export function cacheSurvey(data: ApiCacheSurveyData) {
    return post<{
        surveyId: number;
        time: Date;
    }>('/api/survey/cache', data);
}
export function updateAndPublishSurvey(data: ApiCacheSurveyData) {
    return post<{
        surveyId: number;
        time: Date;
    }>('/api/survey/update-publish', data);
}

// prettier-ignore
export function publishSurvey(surveyId: number) { return post(`/api/survey/publish/${surveyId}`) }
// prettier-ignore
export function stopSurvey(surveyId: number) { return post(`/api/survey/stop/${surveyId}`) }
// prettier-ignore
export function delSurvey(surveyId: number) { return post(`/api/survey/del/${surveyId}`) }
// prettier-ignore
export function recoverSurvey(surveyId: number) { return post(`/api/survey/recover/${surveyId}`) }

export const queryPublishSurvey = () => get<SchemaSurvey[]>('/api/survey/get-publish');
export const queryDraftSurvey = () => get<SchemaSurvey[]>('/api/survey/get-draft');
export const queryDelSurvey = () => get<SchemaSurvey[]>('/api/survey/get-del');
export const queryStopSurvey = () => get<SchemaSurvey[]>('/api/survey/get-stop');
export const queryAllClassifySurvey = () =>
    get<{
        publish: SchemaSurvey[];
        draft: SchemaSurvey[];
        del: SchemaSurvey[];
        stop: SchemaSurvey[];
    }>('/api/survey/all-classify');

//
//
//
//
//
//
//
//
export interface SchemaSurvey {
    id: number;
    title: string;
    comment: string;
    sort_order: number;
    creator_id: number;
    is_draft: number;
    is_valid: number;
    is_deleted: number;
    created_at: Date;
    updated_at: Date;
}

/** 缓存问卷，问卷不存在时自动创建 */
export interface ApiCacheSurveyData {
    /** 这里在某个时间点后和后台的属性值对不上了，导致了 bug 的出现。 */
    surveyId?: number;
    title: string;
    comment: string;
    structure_json: StructureJson;
    survey_type: 0 | 1 | 2;
    is_template: 0 | 1 | 2;
    /** 新增字段，问卷皮肤设置 */
    skin: Record<string, any>;
}
/** 问题的 json 结果。存储在数据库 questionnaire_detail 中 */
export interface StructureJson {
    version: '0.2.0';
    questionList: QuestionItem[];
}
