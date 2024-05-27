import tmp from './all/zh-CN'
import apiInfo from '@/api/locale/zh-CN'
import routerInfo from '@/router/locale/zh-CN'
//
import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';
/** simple */

import localeUserInfo from '@/views/user/info/locale/zh-CN';
import localeUserSetting from '@/views/user/setting/locale/zh-CN';
/** simple end */

export default {
    ...tmp,
    '': '',
    ' ': '',
    ...apiInfo,
    ...routerInfo,

  'menu.dashboard': '仪表盘',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  /** simple */
  ...localeUserInfo,
  ...localeUserSetting,
  /** simple end */
  'settings.title': '页面配置',
  'settings.themeColor': '主题色',
  'settings.content': '内容区域',
  'settings.search': '搜索',
  'settings.language': '语言',
  'settings.navbar': '导航栏',
  'settings.menuWidth': '菜单宽度 (px)',
  'settings.navbar.theme.toLight': '点击切换为亮色模式',
  'settings.navbar.theme.toDark': '点击切换为暗黑模式',
  'settings.navbar.screen.toFull': '点击切换全屏模式',
  'settings.navbar.screen.toExit': '点击退出全屏模式',
  'settings.navbar.alerts': '消息通知',
  'settings.menu': '菜单栏',
  'settings.topMenu': '顶部菜单栏',
  'settings.tabBar': '多标签页',
  'settings.footer': '底部',
  'settings.otherSettings': '其他设置',
  'settings.colorWeak': '色弱模式',
  'settings.alertContent':
      '配置之后仅是临时生效，要想真正作用于项目，点击下方的 "复制配置" 按钮，将配置替换到 settings.json 中即可。',
  'settings.copySettings': '复制配置',
  'settings.copySettings.message': '复制成功，请粘贴到 src/settings.json 文件中',
  'settings.close': '关闭',
  'settings.color.tooltip':
      '根据主题颜色生成的 10 个梯度色（将配置复制到项目中，主题色才能对亮色 / 暗黑模式同时生效）',
  'settings.menuFromServer': '菜单来源于后台',
};
