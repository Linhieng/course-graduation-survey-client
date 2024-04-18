import axios, { get, post } from './axios'
import type { R } from './axios'
// import type { RouteRecordNormalized } from 'vue-router'
import type { UserState } from '@/store/modules/user/types'

if (import.meta.env.VITE_AXIOS_BASE_URL) {
    axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL
}

export type LoginData = {
    username: string
    password: string
}
export function login(data: LoginData) {
    return post<{
        userId: number
        username: string
        token: string
    }>('/api/user/login', data)
}
export function getUserInfo() {
    return post<UserState>('/api/user/info')
}

export function logout() {
    return post('/api/user/logout')
}

export function register(data: LoginData) {
    return post<{
        id: number
        username: string
    }>('/api/user/signup', data)
}

export function isExpired() {
    return get('/api/user/isAuthExpired')
}

// export function getMenuList() {
//     return axios.post<RouteRecordNormalized[]>('/api/user/menu')
// }

// import type { ResProLogin, ResProSignup } from '@/types'
// import { get, post } from '.'

// const urlUserAuthExpired = '/user/isAuthExpired'
// const urlLogin = '/user/login'
// const urlSignup = '/user/signup'

// export function apiIsExpired(data: any) {
//     return get(urlUserAuthExpired, { data })
// }

// export function apiLogin(data: ReqUserLogin): ResProLogin {
//     return post(urlLogin, { data })
// }
// export function apiSignup(data: ReqUserSignup): ResProSignup {
//     return post(urlSignup, { data })
// }
