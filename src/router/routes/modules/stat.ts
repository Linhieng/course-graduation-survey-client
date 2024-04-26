import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const STAT: AppRouteRecordRaw = {
    path: '/sata',
    name: 'stat',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: '统计数据',
        requiresAuth: true,
        icon: 'icon-bar-chart',
        order: 7,
    },
    children: [
        {
            path: 'total',
            name: 'stat-total',
            component: () => import('@/views/stat/stat-total/index.vue'),
            meta: {
                locale: '数据总览',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'total',
            name: 'stat-visual',
            component: () => import('@/views/stat/stat-visual/index.vue'),
            meta: {
                locale: '可视化分析',
                requiresAuth: true,
                roles: ['*'],
            },
        },
    ],
};

export default STAT;
