import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'
import Icon from '@icon/IconDashboard.vue'

const ANSWER: AppRouteRecordRaw = {
    path: '/answer',
    name: 'answer',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.answer',
        requiresAuth: true,
        icon: Icon,
        order: 2,
    },
    children: [
        {
            path: '/dashboard/workplace',
            component: () => import('@/views/dashboard/workplace/index.vue'),
            meta: {
                locale: 'menu.answer.analysis',
                hideInMenu: false,
                activeMenu: false,
            },
        },
        {
            path: '/dashboard/workplace',
            component: () => import('@/views/dashboard/workplace/index.vue'),
            meta: {
                locale: 'menu.answer.visualization',
                hideInMenu: false,
                activeMenu: false,
            },
        },
    ],
}

export default ANSWER
