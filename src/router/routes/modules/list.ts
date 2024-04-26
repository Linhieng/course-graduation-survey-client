import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const LIST: AppRouteRecordRaw = {
    path: '/list',
    name: 'list',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: '我的问卷',
        requiresAuth: true,
        icon: 'icon-list',
        order: 2,
    },
    children: [
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
        {
            path: 'search-table', // The midline path complies with SEO specifications
            name: 'SearchTable',
            component: () => import('@/views/list/search-table/index.vue'),
            meta: {
                hideInMenu: true,
                locale: 'menu.list.searchTable',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'card',
            name: 'Card',
            component: () => import('@/views/list/card/index.vue'),
            meta: {
                hideInMenu: true,
                locale: 'menu.list.cardList',
                requiresAuth: true,
                roles: ['*'],
            },
        },
    ],
};

export default LIST;
