import localeLogin from '@/views/login/locale/en-US'
import footerInfo from '@/components/footer/locale/en-US'
import layoutInfo from '@/layout/locale/en-US'
import utilsMsg from '@/utils/locale/en-US'
import apiInfo from '@/api/locale/en-US'
import notFoundInfo from '@/views/not-found/locale/en-US'

import sidebarMenuInfo from '@/router/locale/en-US'

import workplace from '@/views/dashboard/workplace/locale/en-US';

import surveyCreate from '@/views/survey/create/locale/en-US'
import surveyDraft from '@/views/survey/draft/locale/en-US'
import surveyPublish from '@/views/survey/publish/locale/en-US'
import surveyStop from '@/views/survey/stop/locale/en-US'
import surveyTrash from '@/views/survey/trash/locale/en-US'

import statAnalysis from '@/views/stat/analysis/locale/en-US'
import statVisual from '@/views/stat/visual/locale/en-US'

export default {
    'navbar.action.locale': 'Switch to English',

    ...utilsMsg,
    ...localeLogin,
    ...footerInfo,
    ...layoutInfo,
    ...apiInfo,
    ...notFoundInfo,

    ...sidebarMenuInfo,

    ...workplace,

    ...surveyCreate,
    ...surveyDraft,
    ...surveyPublish,
    ...surveyStop,
    ...surveyTrash,

    ...statAnalysis,
    ...statVisual,
}
