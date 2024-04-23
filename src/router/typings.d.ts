import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        roles?: string[]; // Controls roles that have access to the page
        /** 是否需要登录才可访问 */
        requiresAuth: boolean; // Whether login is required to access the current page (every route must declare)
        icon?: string; // The icon show in the side menu
        /** 展示在页面上的名称，国际化 */
        locale?: string; // The locale name show in side menu and breadcrumb
        /** 不显示在侧边栏中 */
        hideInMenu?: boolean; // If true, it is not displayed in the side menu
        hideChildrenInMenu?: boolean; // if set true, the children are not displayed in the side menu
        activeMenu?: string; // if set name, the menu will be highlighted according to the name you set
        order?: number; // Sort routing menu items. If set key, the higher the value, the more forward it is
        /** 不显示在上方标签页中 */
        noAffix?: boolean; // if set true, the tag will not affix in the tab-bar
        ignoreCache?: boolean; // if set true, the page will not be cached
    }
}
