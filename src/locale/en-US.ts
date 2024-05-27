import tmp from './all/en-US'
import apiInfo from '@/api/locale/en-US'
import routerInfo from '@/router/locale/en-US'
// 
import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';
/** simple */

import locale403 from '@/views/exception/403/locale/en-US';
import locale404 from '@/views/exception/404/locale/en-US';
import locale500 from '@/views/exception/500/locale/en-US';

import localeUserInfo from '@/views/user/info/locale/en-US';
import localeUserSetting from '@/views/user/setting/locale/en-US';
/** simple end */

export default {
    ...tmp,
    '': '',
    ' ': '',
    ...apiInfo,
    ...routerInfo,
    
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
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  /** simple */
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeUserInfo,
  ...localeUserSetting,
  /** simple end */
  'settings.title': 'Settings',
  'settings.themeColor': 'Theme Color',
  'settings.content': 'Content Setting',
  'settings.search': 'Search',
  'settings.language': 'Language',
  'settings.navbar': 'Navbar',
  'settings.menuWidth': 'Menu Width (px)',
  'settings.navbar.theme.toLight': 'Click to use light mode',
  'settings.navbar.theme.toDark': 'Click to use dark mode',
  'settings.navbar.screen.toFull': 'Click to switch to full screen mode',
  'settings.navbar.screen.toExit': 'Click to exit the full screen mode',
  'settings.navbar.alerts': 'alerts',
  'settings.menu': 'Menu',
  'settings.topMenu': 'Top Menu',
  'settings.tabBar': 'Tab Bar',
  'settings.footer': 'Footer',
  'settings.otherSettings': 'Other Settings',
  'settings.colorWeak': 'Color Weak',
  'settings.alertContent':
      'After the configuration is only temporarily effective, if you want to really affect the project, click the "Copy Settings" button below and replace the configuration in settings.json.',
  'settings.copySettings': 'Copy Settings',
  'settings.copySettings.message': 'Copy succeeded, please paste to file src/settings.json.',
  'settings.close': 'Close',
  'settings.color.tooltip': '10 gradient colors generated according to the theme color',
  'settings.menuFromServer': 'Menu From Server',
};
