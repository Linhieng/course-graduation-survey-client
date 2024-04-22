export interface StatStore {
    isFetching: boolean;
    statCount: StatCount;
}

/** 对应接口 '/api/stat/count-stat' */
export interface StatCount {
    /** 总访问量 */
    count_all_visit: number;
    /** 总回答数量 */
    count_all_answer: number;
    /** 总的问卷数量 */
    count_all_survey: number;
    /** 总的问卷草稿 */
    count_draft_survey: number;
    /** 总的已发布问卷 */
    count_publish_survey: number;
    /** 总的已停止问卷 */
    count_stop_survey: number;
    /** 今天创建问卷的数量 */
    today_count_create_survey: number;
    /** 今天的发布问卷的数量 */
    today_count_publish_survey: number;
    /** 今天的收到的回答数量 */
    today_count_answer_survey: number;
}
