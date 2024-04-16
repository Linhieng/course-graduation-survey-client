<script lang="ts" setup>
import IconLogo from '@icon/IconLogo.vue'
import IconZhEn from '@icon/IconZhEn.vue'
import IconLogout from '@icon/IconLogout.vue'
import Fullscreen from '@icon/IconFullscreen.vue'
import AutoDrawer from '@/components/AutoDrawer.vue'
import AutoDropdown from '@/components/AutoDropdown.vue'

import useLocale from '@/hooks/locale'
import { useI18n } from 'vue-i18n'
import useUser from '@/hooks/user'
import { useFullscreen } from '@vueuse/core'

const { toggle: toggleFullScreen } = useFullscreen()
const { toggleZhEn } = useLocale()
const { t } = useI18n()
const { logout } = useUser()

const handleSomething = (
    action: 'toggleZhEn' | 'toggleFullScreen' | 'handleLogout',
) => {
    if (action === 'handleLogout') {
        logout()
    } else if (action === 'toggleFullScreen') {
        toggleFullScreen()
    } else if (action === 'toggleZhEn') {
        toggleZhEn()
    }
}
const slotItems = [
    {
        text: 'layout.header.toggleLanguage',
        action: 'toggleZhEn',
        icon: IconZhEn,
    },
    {
        text: 'layout.header.toggleFullscreen',
        action: 'toggleFullScreen',
        icon: Fullscreen,
    },
    {
        text: 'layout.header.logout',
        action: 'handleLogout',
        icon: IconLogout,
    },
]
</script>

<template>
    <div class="top-header">
        <div class="left-side">
            <el-icon size="50">
                <IconLogo />
            </el-icon>
        </div>
        <!-- <div class="center-side">
            <Menu v-if="topMenu" />
        </div> -->
        <div class="right-side">
            <AutoDropdown :slotItems :titleShow="$t('layout.settings')">
                <template #item="{ action, text, icon }">
                    <li>
                        <el-button @click="handleSomething(action)">
                            <el-icon size="20">
                                <component :is="icon" />
                            </el-icon>
                            {{ $t(text) }}
                        </el-button>
                    </li>
                </template>
            </AutoDropdown>
            <!-- <AutoDrawer>
                <li>
                    <el-button @click="toggleZhEn">{{
                        $t('layout.header.toggleLanguage')
                    }}</el-button>
                </li>
                <li class="cursor-pointer">
                    <el-button @click="toggleFullScreen">
                        <el-icon size="20">
                            <template v-if="isFullscreen">
                                <FullscreenExit />
                            </template>
                            <template v-else>
                                <Fullscreen />
                            </template>
                        </el-icon>
                        {{
                            isFullscreen
                                ? $t('layout.header.exitFullscreen')
                                : $t('layout.header.toFullscreen')
                        }}
                    </el-button>
                </li>
                <li>
                    <el-button @click="handleLogout">{{
                        $t('layout.header.logout')
                    }}</el-button>
                </li>
            </AutoDrawer> -->
        </div>
    </div>
</template>

<!-- <script lang="ts" setup>
// import { computed, ref, inject } from 'vue'
// import { Message } from '@arco-design/web-vue'
// import { useDark, useToggle, useFullscreen } from '@vueuse/core'
// import { useAppStore, useUserStore } from '@/store'
// import { LOCALE_OPTIONS } from '@/locale'
// import useLocale from '@/hooks/locale'
// import useUser from '@/hooks/user'
// import Menu from '@/components/menu/index.vue'
// import MessageBox from '../message-box/index.vue'

// const appStore = useAppStore()
// const userStore = useUserStore()
// const { logout } = useUser()
// const { changeLocale, currentLocale } = useLocale()
// const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()
// const locales = [...LOCALE_OPTIONS]
// const avatar = computed(() => {
//     return userStore.avatar
// })
// const theme = computed(() => {
//     return appStore.theme
// })
// const topMenu = computed(() => appStore.topMenu && appStore.menu)
// const isDark = useDark({
//     selector: 'body',
//     attribute: 'arco-theme',
//     valueDark: 'dark',
//     valueLight: 'light',
//     storageKey: 'arco-theme',
//     onChanged(dark: boolean) {
//         // overridden default behavior
//         appStore.toggleTheme(dark)
//     },
// })
// const toggleTheme = useToggle(isDark)
// const handleToggleTheme = () => {
//     toggleTheme()
// }
// const setVisible = () => {
//     appStore.updateSettings({ globalSettings: true })
// }
// const refBtn = ref()
// const triggerBtn = ref()
// const setPopoverVisible = () => {
//     const event = new MouseEvent('click', {
//         view: window,
//         bubbles: true,
//         cancelable: true,
//     })
//     refBtn.value.dispatchEvent(event)
// }
// const handleLogout = () => {
//     logout()
// }
// const setDropDownVisible = () => {
//     const event = new MouseEvent('click', {
//         view: window,
//         bubbles: true,
//         cancelable: true,
//     })
//     triggerBtn.value.dispatchEvent(event)
// }
// const switchRoles = async () => {
//     const res = await userStore.switchRoles()
//     Message.success(res as string)
// }
// const toggleDrawerMenu = inject('toggleDrawerMenu') as () => void
</script> -->

<style scoped lang="scss">
ul {
    list-style: none;
}
.top-header {
    display: flex;
    min-height: 60px;
    align-items: center;
    justify-content: space-between;

    .left-side {
        display: flex;
    }
    .right-side {
        align-self: stretch;

        display: flex;
        align-items: center;
        padding-right: 10px;

        li {
            margin: 10px;
        }
        .cursor-pointer {
            display: flex;
            align-items: center;
        }
    }
}
</style>
