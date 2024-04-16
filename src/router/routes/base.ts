import type { RouteRecordRaw } from 'vue-router'
import { REDIRECT_ROUTE_NAME } from '@/router/constants'

export const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue')

// 重定向，比如用户重新登录时，可以直接指定登录成功后跳到每个页面，这就是
// 重定向的作用。
export const REDIRECT_MAIN: RouteRecordRaw = {
    path: '/redirect',
    name: 'redirectWrapper',
    component: DEFAULT_LAYOUT,
    meta: {
        requiresAuth: true,
        hideInMenu: true,
    },
    children: [
        {
            path: '/redirect/:path',
            name: REDIRECT_ROUTE_NAME,
            component: () => import('@/views/redirect/index.vue'),
            meta: {
                requiresAuth: true,
                hideInMenu: true,
            },
        },
    ],
}

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/not-found/index.vue'),
}