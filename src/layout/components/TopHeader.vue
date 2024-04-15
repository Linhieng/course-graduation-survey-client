<script lang="ts" setup>
import Fullscreen from '@icon/IconFullscreen.vue'
import FullscreenExit from '@icon/IconFullscreenExit.vue'
import { UserFilled } from '@element-plus/icons-vue'
import IconLogo from '@icon/IconLogo.vue'
import useLocale from '@/hooks/locale'
import useUser from '@/hooks/user'
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()
const { toggleZhEn } = useLocale()

const { logout } = useUser()
const handleLogout = () => {
    logout()
}
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
        <ul class="right-side">
            <li>
                <el-button text @click="toggleZhEn">{{
                    $t('layout.header.toggleLanguage')
                }}</el-button>
            </li>
            <el-tooltip
                :content="
                    isFullscreen
                        ? $t('layout.header.exitFullscreen')
                        : $t('layout.header.toFullscreen')
                "
            >
                <li @click="toggleFullScreen" class="cursor-pointer">
                    <el-icon size="30">
                        <template v-if="isFullscreen">
                            <FullscreenExit />
                        </template>
                        <template v-else>
                            <Fullscreen />
                        </template>
                    </el-icon>
                </li>
            </el-tooltip>
            <li>
                <el-dropdown>
                    <span>
                        <el-avatar :icon="UserFilled" />
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <el-button text @click="handleLogout">{{
                                    $t('layout.header.logout')
                                }}</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </li>
        </ul>
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
        display: flex;
        align-self: stretch;

        align-items: center;

        li {
            margin: 0 10px;
        }
        .cursor-pointer {
            display: flex;
            align-items: center;

            align-self: stretch;
            padding: 0 10px;
            display: flex;
        }
    }
}
</style>
