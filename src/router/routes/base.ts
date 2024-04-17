import type { RouteRecordRaw } from 'vue-router'
import { REDIRECT_ROUTE_NAME } from '@/router/constants'

export const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue')

export const EXCEPTION: RouteRecordRaw = {
    path: '/exception',
    name: 'exception',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.exception',
        requiresAuth: true,
        icon: 'icon-exclamation-circle',
        order: 6,
    },
    children: [
        {
            path: '403',
            name: '403',
            component: () => import('@/views/exception/403/index.vue'),
            meta: {
                locale: 'menu.exception.403',
                requiresAuth: true,
                roles: ['admin'],
            },
        },
        {
            path: '404',
            name: '404',
            component: () => import('@/views/exception/404/index.vue'),
            meta: {
                locale: 'menu.exception.404',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: '500',
            name: '500',
            component: () => import('@/views/exception/500/index.vue'),
            meta: {
                locale: 'menu.exception.500',
                requiresAuth: true,
                roles: ['*'],
            },
        },
    ],
}

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
