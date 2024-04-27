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
        order: 3,
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
            path: 'visual',
            name: 'collect-visual',
            component: () => import('@/views/collect/visual/index.vue'),
            meta: {
                locale: '可视化分析',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'total',
            name: 'collect-stat',
            component: () => import('@/views/collect/collect-stat/index.vue'),
            meta: {
                hideInMenu: true,
                locale: '数据总览',
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
