import localeLogin from '@/views/login/locale/en-US'
import footerInfo from '@/components/footer/locale/en-US'
import layoutInfo from '@/layout/locale/en-US'
import utilsMsg from '@/utils/locale/en-US'
import apiInfo from '@/api/locale/en-US'
import notFoundInfo from '@/views/not-found/locale/en-US'
import sidebarMenuInfo from '@/components/sidebar-menu/locale/en-US'

export default {
    'menu.dashboard': 'Dashboard',
    'menu.server.dashboard': 'Dashboard-Server',
    'menu.server.workplace': 'Workplace-Server',
    'menu.server.monitor': 'Monitor-Server',
    'menu.list': 'List',
    'menu.result': 'Result',
    'menu.exception': 'Exception',
    'menu.form': 'Form',
    'menu.profile': 'Profile',
    'menu.visualization': 'Data Visualization',
    'menu.user': 'User Center',
    'menu.arcoWebsite': 'Arco Design',
    'menu.faq': 'FAQ',
    'navbar.docs': 'Docs',
    'navbar.action.locale': 'Switch to English',

    ...utilsMsg,
    ...localeLogin,
    ...footerInfo,
    ...layoutInfo,
    ...apiInfo,
    ...notFoundInfo,
    ...sidebarMenuInfo,
}
