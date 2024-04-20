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
    return post<UserState>('/api/user/info');
}

export function updateUserInfo(data: Partial<UserInfoCanModified>) {
    return post('/api/user/update-info', data);
}

export function changePassword(data: { oldPassword: string; newPassword: string }) {
    return post('/api/user/modify-password', data);
}

export function getMenuList() {
    return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

//
//
//
export interface UserInfoCanModified {
    name: string;
    avatar: string;
    email: string;
    job: string;
    job_name: string;
    organization: string;
    organization_name: string;
    location: string;
    location_name: string;
    introduction: string;
    personal_website: string;
    phone: string;
}
