import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const TEMPLATE: AppRouteRecordRaw = {
    path: '/template',
    name: 'template',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: '模版市场',
        requiresAuth: true,
        icon: 'icon-star',
        order: 5,
    },
    children: [
        {
            path: 'my',
            name: 'template-my',
            component: () => import('@/views/template/my/index.vue'),
            meta: {
                locale: '我的模版',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'share',
            name: 'template-share',
            component: () => import('@/views/template/share/index.vue'),
            meta: {
                locale: '共享模版',
                requiresAuth: true,
                roles: ['*'],
            },
        },
    ],
};

export default TEMPLATE;
