import axios from 'axios';
import { get, post } from './axios';
import { UserMessageItem } from '@/store/modules/message/types';

export function getMessageUnread() {
    return get<{
        unread: UserMessageItem[];
        read: UserMessageItem[];
        all: UserMessageItem[];
    }>('/api/message/unread');
}
export function setMessageRead(ids: number[]) {
    return post('/api/message/set-read', {
        ids,
    });
}
//
//
//
//
//
//
//
//

export interface MessageRecord {
    id: number;
    type: string;
    title: string;
    subTitle: string;
    avatar?: string;
    content: string;
    time: string;
    status: 0 | 1;
    messageType?: number;
}
export type MessageListType = MessageRecord[];

export function queryMessageList() {
    return axios.post<MessageListType>('/api/message/list');
}

interface MessageStatus {
    ids: number[];
}

export function setMessageStatus(data: MessageStatus) {
    return axios.post<MessageListType>('/api/message/read', data);
}

export interface ChatRecord {
    id: number;
    username: string;
    content: string;
    time: string;
    isCollect: boolean;
}

export function queryChatList() {
    return axios.post<ChatRecord[]>('/api/chat/list');
}
