import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'
import Icon from '@icon/IconDashboard.vue'

const SURVEY: AppRouteRecordRaw = {
    path: '/survey',
    name: 'survey',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.survey',
        requiresAuth: true,
        icon: Icon,
        order: 1,
    },
    children: [
        {
            path: '/dashboard/workplace',
            component: () => import('@/views/dashboard/workplace/index.vue'),
            meta: {
                locale: 'menu.survey.draft',
                hideInMenu: false,
                activeMenu: false,
            },
        },
        {
            path: '/dashboard/workplace',
            component: () => import('@/views/dashboard/workplace/index.vue'),
            meta: {
                locale: 'menu.survey.publish',
                hideInMenu: false,
                activeMenu: false,
            },
        },
        {
            path: '/dashboard/workplace',
            component: () => import('@/views/dashboard/workplace/index.vue'),
            meta: {
                locale: 'menu.survey.stop',
                hideInMenu: false,
                activeMenu: false,
            },
        },
        {
            path: '/dashboard/workplace',
            component: () => import('@/views/dashboard/workplace/index.vue'),
            meta: {
                locale: 'menu.survey.dump',
                hideInMenu: false,
                activeMenu: false,
            },
        },
    ],
}

export default SURVEY
