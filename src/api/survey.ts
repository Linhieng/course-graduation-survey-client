import { QuestionItem, Survey } from '@/store/modules/create/types';
import { get, post } from './axios';

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
        structure_json: {
            version: '0.2.0';
            questionList: QuestionItem[];
        };
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
    surveyId?: number;
    title: string;
    comment: string;
    structure_json: StructureJson;
}
export interface StructureJson {
    version: '0.2.0';
    questionList: QuestionItem[];
}
