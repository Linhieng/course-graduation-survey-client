import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
    path: '/dashboard',
    name: 'dashboard',
    component: DEFAULT_LAYOUT,
    redirect: { name: 'Workplace' },
    meta: {
        locale: '工作台',
        requiresAuth: true,
        icon: 'icon-dashboard',
        order: 1,
    },
    children: [
        {
            path: 'workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/workplace/index.vue'),
            meta: {
                locale: '主面板',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'create-entry',
            name: 'create-entry',
            component: () => import('@/views/dashboard/create-entry/index.vue'),
            meta: {
                locale: '新建问卷',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'create',
            name: 'Create',
            component: () => import('@/views/dashboard/create/index.vue'),
            meta: {
                locale: '编辑问卷',
                requiresAuth: true,
                roles: ['*'],
                disabled: true,
                noAffix: true,
            },
        },
    ],
};

export default DASHBOARD;
