import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'
import Icon from '@icon/IconDashboard.vue'

const DASHBOARD: AppRouteRecordRaw = {
    path: '/dashboard',
    name: 'dashboard',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.dashboard',
        requiresAuth: true,
        icon: Icon,
        order: 0,
    },
    children: [
        {
            path: 'workplace',
            name: 'Workplace', // 这是默认路由
            component: () => import('@/views/dashboard/workplace/index.vue'),
            meta: {
                locale: 'menu.dashboard.workplace',
                requiresAuth: true,
                hideInMenu: false,
                activeMenu: false,
                // roles: ['*'],
            },
        },
        /** simple */
        {
            path: 'monitor',
            name: 'Monitor',
            component: () => import('@/views/dashboard/monitor/index.vue'),
            meta: {
                locale: 'menu.dashboard.monitor',
                requiresAuth: true,
                // roles: ['admin'],
            },
        },
        /** simple end */
    ],
}

export default DASHBOARD
