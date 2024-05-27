import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const COLLECT: AppRouteRecordRaw = {
    path: '/collect',
    name: 'collect',
    component: DEFAULT_LAYOUT,
    redirect: { name: 'collect-entry' },
    meta: {
        locale: '问卷收集',
        requiresAuth: true,
        icon: 'icon-bar-chart',
        order: 3,
    },
    children: [
        {
            path: 'entry',
            name: 'collect-entry',
            component: () => import('@/views/collect/entry/index.vue'),
            meta: {
                locale: '选择问卷',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'table/:surveyId',
            name: 'collect-table',
            props: true,
            component: () => import('@/views/collect/table/index.vue'),
            meta: {
                noAffix: true,
                locale: '可视化分析',
                requiresAuth: true,
                roles: ['*'],
                disabled: true,
            },
        },
    ],
};

export default COLLECT;
