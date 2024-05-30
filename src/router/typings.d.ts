import 'vue-router';

declare module 'vue-router' {
    /**
     * meta 中属性说明
     * - isExternal: 是否是外部链接，为 true 时会显示一个外部链接图标
     */
    interface RouteMeta {
        /** 必填。是否需要登录才能访问 */
        requiresAuth: boolean;
        /** 设置允许哪些角色访问该页面，设置为 ['*'] 表示所有用户访问 , */
        roles?: string[];
        /** 在侧边栏菜单中的图标名称，注意该图标需要在全局中注册 */
        icon?: string; // The icon show in the side menu
        /** 在侧边栏菜单和面包屑中显示的标题，i18n */
        locale?: string;
        /** 是否在侧边栏菜单中隐藏 */
        hideInMenu?: boolean;
        /** 是否隐藏子菜单 */
        hideChildrenInMenu?: boolean;
        /** if set name, the menu will be highlighted according to the name you set */
        activeMenu?: string;
        /** 在侧边栏菜单中的顺序，从小到大排序。the higher the value, the more forward it is */
        order?: number;
        /** 为 true 时，标签页中将不显示该路由页。 */
        noAffix?: boolean;
        /** 控制是否缓存页面，注意，缓存的也只是组件中的数据，如果数据放在 pinia state 中，则不受影响。 */
        ignoreCache?: boolean; // if set true, the page will not be cached
        /** 是否在禁用，也就是不允许用户点击，但可以通过程序跳转 */
        disabled?: boolean;
    }
}
