import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        /**必选。是否需要登录才能访问当前页面 */
        requiresAuth: boolean

        /** 组件，显示在 sidebar 中 */
        icon?: any
        /** 显示的标题，使用 locale 表示 */
        locale?: string
        /** 在 sidebar 中显示的优先级，默认是 0。数值越大，越靠后（升序） */
        order?: number
    }
}
