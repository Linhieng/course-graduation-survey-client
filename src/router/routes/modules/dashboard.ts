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
            },
        },
    ],
}

export default DASHBOARD
