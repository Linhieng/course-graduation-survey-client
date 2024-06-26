import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const LIST: AppRouteRecordRaw = {
    path: '/list',
    name: 'list',
    component: DEFAULT_LAYOUT,
    redirect: { name: 'my-all-survey' },
    meta: {
        locale: '我的问卷',
        requiresAuth: true,
        icon: 'icon-list',
        order: 2,
    },
    children: [
        {
            path: 'my-all-survey',
            name: 'my-all-survey',
            component: () => import('@/views/list/my-all-survey/index.vue'),
            meta: {
                locale: '所有问卷',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'my-draft',
            name: 'my-draft-survey',
            component: () => import('@/views/list/my-draft/index.vue'),
            meta: {
                locale: '问卷草稿箱',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'my-publish',
            name: 'my-publish-survey',
            component: () => import('@/views/list/my-publish/index.vue'),
            meta: {
                locale: '已发布的问卷',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'my-stop',
            name: 'my-stop-survey',
            component: () => import('@/views/list/my-stop/index.vue'),
            meta: {
                locale: '已停止的问卷',
                requiresAuth: true,
                roles: ['*'],
            },
        },
    ],
};

export default LIST;
