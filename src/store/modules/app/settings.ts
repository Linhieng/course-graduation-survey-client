import type { RouteRecordNormalized } from 'vue-router'

export interface AppState {
    theme: 'light' | 'dark' | 'auto'
    hideMenu: boolean

    // colorWeak: boolean
    // navbar: boolean
    // menu: boolean
    // topMenu: boolean
    // menuCollapse: boolean
    // footer: boolean
    // themeColor: string
    // menuWidth: number
    // globalSettings: boolean
    // device: string
    // tabBar: boolean
    // menuFromServer: boolean
    // serverMenu: RouteRecordNormalized[]
    // [key: string]: unknown
}

export const defaultSettings: AppState = {
    theme: 'light',
    hideMenu: false,

    // "colorWeak": false,
    // "navbar": true,
    // "menu": true,
    // "topMenu": false,
    // "menuCollapse": false,
    // "footer": true,
    // "themeColor": "#165DFF",
    // "menuWidth": 220,
    // "globalSettings": false,
    // "device": "desktop",
    // "tabBar": false,
    // "menuFromServer": false,
    // "serverMenu": []
}
