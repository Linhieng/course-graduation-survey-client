import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'
import Icon from '@icon/IconMenuStat.vue'

const STAT: AppRouteRecordRaw = {
    path: '/stat',
    name: 'stat',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.stat',
        requiresAuth: true,
        icon: Icon,
        order: 2,
    },
    children: [
        {
            path: '/stat/analysis',
            component: () => import('@/views/stat/analysis/index.vue'),
            meta: {
                requiresAuth: true,
                locale: 'menu.stat.analysis',
            },
        },
        {
            path: '/stat/visual',
            component: () => import('@/views/stat/visual/index.vue'),
            meta: {
                requiresAuth: true,
                locale: 'menu.stat.visual',
            },
        },
    ],
}

export default STAT
