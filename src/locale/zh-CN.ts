import localeLogin from '@/views/login/locale/zh-CN'
import footerInfo from '@/components/footer/locale/zh-CN'
import layoutInfo from '@/layout/locale/zh-CN'
import utilsMsg from '@/utils/locale/zh-CN'
import apiInfo from '@/api/locale/zh-CN'
import notFoundInfo from '@/views/not-found/locale/zh-CN'

import sidebarMenuInfo from '@/router/locale/zh-CN'

import workplace from '@/views/dashboard/workplace/locale/zh-CN';

import surveyDraft from '@/views/survey/draft/locale/zh-CN'
import surveyPublish from '@/views/survey/publish/locale/zh-CN'
import surveyStop from '@/views/survey/stop/locale/zh-CN'
import surveyTrash from '@/views/survey/trash/locale/zh-CN'

import statAnalysis from '@/views/stat/analysis/locale/zh-CN'
import statVisual from '@/views/stat/visual/locale/zh-CN'

export default {
    'navbar.action.locale': '切换为中文',

    ...utilsMsg,
    ...localeLogin,
    ...footerInfo,
    ...layoutInfo,
    ...apiInfo,
    ...notFoundInfo,

    ...sidebarMenuInfo,

    ...workplace,

    ...surveyDraft,
    ...surveyPublish,
    ...surveyStop,
    ...surveyTrash,

    ...statAnalysis,
    ...statVisual,
}
