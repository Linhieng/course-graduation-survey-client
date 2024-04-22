export interface StatStore {
    loading: {
        fetchGroupByDay: boolean;
    };
    isFetching: boolean;
    statCount: StatCount;
    statGroupByDay: StatGroupByDay;
}

/** 对应接口 /api/stat/group-by-day */
export interface StatGroupByDay {
    xAxis: string[];
    data: [
        { name: '创建问卷'; key: 'create_survey'; count: number; value: number[] },
        { name: '发布问卷'; key: 'publish_survey'; count: number; value: number[] },
        { name: '问卷草稿'; key: 'draft_survey'; count: number; value: number[] },
        { name: '停止收集'; key: 'stop_survey'; count: number; value: number[] },
        { name: '删除问卷'; key: 'del_survey'; count: number; value: number[] },
    ];
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
