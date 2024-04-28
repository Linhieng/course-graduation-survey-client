export interface SurveyListStore {
    loading: {
        searching: boolean;
    };
    updateData: {
        title: string;
        comment: string;
        status: number;
        is_template: number;
    };
    searchResult: SearchSurveyResult;
    searchPage: {
        pageStart: number;
        pageSize: number;
    };
}
export interface SearchSurveyResult {
    total: number;
    pageStart: number;
    pageSize: number;
    survey_list: Array<{
        /** 前段自己添加的 */
        status?: '已删除' | '草稿' | '发布中' | '已停止';

        collect_answer?: number;
        collect_visited?: number;
        id?: number;
        title?: string;
        comment?: string;
        sort_order?: number;
        creator_id?: number;
        is_draft?: number;
        is_valid?: number;
        is_deleted?: number;
        survey_type?: number;
        is_template?: number;
        created_at?: string;
        updated_at?: string;
    }>;
}
