import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
import { post } from './axios';

export interface LoginData {
    username: string;
    password: string;
}

export interface LoginRes {
    token: string;
}
export function login(data: LoginData) {
    return post<LoginRes>('/api/user/login', data);
}
export function signup(data: LoginData) {
    return post('/api/user/signup', data);
}

export function logout() {
    return post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
    return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
    return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
