export interface MessageStore {
    loading: {
        //** 这个用于控制是否显示加载中 */
        showFetchUserMessage: boolean;
        /** 这个用户控制请求次数 */
        fetchUserMessage: boolean;
        /** 当前正在 loading 的每个消息项 */
        loadingIds: number[];
        setAllRead: boolean;
    };
    message: {
        unread: UserMessageItem[];
        read: UserMessageItem[];
        all: UserMessageItem[];
    };
}

export interface UserMessageItem {
    id: number;
    user_id: number;
    /** 1 表示新增一份回答 */
    message_type: 1;
    message_from: 'system';
    content: string;
    survey_id: number;
    answer_id: number;
    /** 0 表示未读，1 表示已读 */
    message_status: number;
    /** 2024-04-24T06:45:44.000Z */
    created_at: string;
    updated_at: string;
}
