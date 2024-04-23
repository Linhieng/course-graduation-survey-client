import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const COLLECT: AppRouteRecordRaw = {
    path: '/collect',
    name: 'collect',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: '问卷收集',
        requiresAuth: true,
        icon: 'icon-bar-chart',
        order: 1,
    },
    children: [
        {
            path: 'entry',
            name: 'collect-entry',
            component: () => import('@/views/collect/entry/index.vue'),
            meta: {
                locale: '答案统计',
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
                hideInMenu: true,
                noAffix: true,
                locale: '查看答案',
                requiresAuth: true,
                roles: ['*'],
            },
        },
    ],
};

export default COLLECT;