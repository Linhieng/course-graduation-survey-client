import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'
import Icon from '@icon/IconSurvey.vue'

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
            path: '/survey/create',
            component: () => import('@/views/survey/create/index.vue'),
            meta: {
                locale: 'menu.survey.create',
                requiresAuth: true,
            },
        },
        {
            path: '/survey/draft',
            component: () => import('@/views/survey/draft/index.vue'),
            meta: {
                locale: 'menu.survey.draft',
                requiresAuth: true,
            },
        },
        {
            path: '/survey/publish',
            component: () => import('@/views/survey/publish/index.vue'),
            meta: {
                locale: 'menu.survey.publish',
                requiresAuth: true,
            },
        },
        {
            path: '/survey/stop',
            component: () => import('@/views/survey/stop/index.vue'),
            meta: {
                locale: 'menu.survey.stop',
                requiresAuth: true,
            },
        },
        {
            path: '/survey/trash',
            component: () => import('@/views/survey/trash/index.vue'),
            meta: {
                locale: 'menu.survey.trash',
                requiresAuth: true,
            },
        },
    ],
}

export default SURVEY
