<template>
    <div class="navbar">
        <div class="left-side">
            <a-space>
                <img alt="logo" style="width: 25px; height: 25px" src="/logo.png" />
                <a-typography-title :style="{ margin: 0, fontSize: '18px' }" :heading="5">
                    {{ $t('问卷系统') }}
                </a-typography-title>
                <icon-menu-fold
                    v-if="!topMenu && appStore.device === 'mobile'"
                    style="font-size: 22px; cursor: pointer"
                    @click="toggleDrawerMenu"
                />
            </a-space>
        </div>
        <div class="center-side">
            <!-- 控制侧边栏可以是否放在顶部 -->
            <Menu v-if="topMenu" />
        </div>
        <ul class="right-side">
            <li>
                <a-tooltip :content="$t('搜索')">
                    <a-button class="nav-btn" type="outline" :shape="'circle'">
                        <template #icon>
                            <icon-search />
                        </template>
                    </a-button>
                </a-tooltip>
            </li>
            <li>
                <a-tooltip :content="$t('切换语言')">
                    <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setDropDownVisible">
                        <template #icon>
                            <icon-language />
                        </template>
                    </a-button>
                </a-tooltip>
                <a-dropdown trigger="click" @select="changeLocale as any">
                    <div ref="triggerBtn" class="trigger-btn"></div>
                    <template #content>
                        <a-doption v-for="item in locales" :key="item.value" :value="item.value">
                            <template #icon>
                                <icon-check v-show="item.value === currentLocale" />
                            </template>
                            {{ item.label }}
                        </a-doption>
                    </template>
                </a-dropdown>
            </li>
            <li>
                <a-tooltip :content="theme === 'light' ? $t('切换到暗色') : $t('切换到亮色')">
                    <a-button class="nav-btn" type="outline" :shape="'circle'" @click="handleToggleTheme">
                        <template #icon>
                            <icon-moon-fill v-if="theme === 'dark'" />
                            <icon-sun-fill v-else />
                        </template>
                    </a-button>
                </a-tooltip>
            </li>
            <li>
                <a-tooltip :content="$t('消息盒')">
                    <div class="message-box-trigger">
                        <a-badge dot :count="messageStore.state.message.unread.length">
                            <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setPopoverVisible">
                                <icon-notification />
                            </a-button>
                        </a-badge>
                    </div>
                </a-tooltip>
                <!-- 这里页面上对不齐，所以不显示弹出框箭头图标 -->
                <a-popover
                    trigger="click"
                    :arrow-style="{ display: 'none' }"
                    :content-style="{ padding: 0, maxWidth: '600px' }"
                    content-class="message-popover"
                >
                    <!-- 删除后弹出框不显示，暂时不清楚为什么为在他身上分配事件 -->
                    <div ref="refBtn" class="ref-btn"></div>
                    <template #content>
                        <message-box />
                    </template>
                </a-popover>
            </li>
            <li>
                <a-tooltip :content="isFullscreen ? $t('退出全屏') : $t('进入全屏')">
                    <a-button class="nav-btn" type="outline" :shape="'circle'" @click="toggleFullScreen">
                        <template #icon>
                            <icon-fullscreen-exit v-if="isFullscreen" />
                            <icon-fullscreen v-else />
                        </template>
                    </a-button>
                </a-tooltip>
            </li>
            <li>
                <a-tooltip :content="$t('布局设置')">
                    <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setVisible">
                        <template #icon>
                            <icon-settings />
                        </template>
                    </a-button>
                </a-tooltip>
            </li>
            <li>
                <a-dropdown trigger="click">
                    <a-avatar :size="32" :style="{ marginRight: '8px', cursor: 'pointer' }">
                        <img alt="avatar" :src="avatar" />
                    </a-avatar>
                    <template #content>
                        <!-- <a-doption>
                            <a-space @click="switchRoles">
                                <icon-tag />
                                <span>
                                    {{ $t('切换角色') }}
                                </span>
                            </a-space>
                        </a-doption> -->
                        <a-doption>
                            <a-space @click="$router.push({ name: 'Info' })">
                                <icon-user />
                                <span>
                                    {{ $t('用户信息') }}
                                </span>
                            </a-space>
                        </a-doption>
                        <a-doption>
                            <a-space @click="$router.push({ name: 'Setting' })">
                                <icon-settings />
                                <span>
                                    {{ $t('用户设置') }}
                                </span>
                            </a-space>
                        </a-doption>
                        <a-doption>
                            <a-space @click="handleLogout">
                                <icon-export />
                                <span>
                                    {{ $t('退出登录') }}
                                </span>
                            </a-space>
                        </a-doption>
                    </template>
                </a-dropdown>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, inject } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useDark, useToggle, useFullscreen } from '@vueuse/core';
import { useAppStore, useUserStore } from '@/store';
import { LOCALE_OPTIONS } from '@/locale';
import useLocale from '@/hooks/locale';
import useUser from '@/hooks/user';
import Menu from '@/components/menu/index.vue';
import MessageBox from '../message-box/index.vue';
import { useMessageStore } from '@/store';
const messageStore = useMessageStore();

const appStore = useAppStore();
const userStore = useUserStore();
const { logout } = useUser();
const { changeLocale, currentLocale } = useLocale();
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();
const locales = [...LOCALE_OPTIONS];
const avatar = computed(() => {
    return userStore.avatar;
});
const theme = computed(() => {
    return appStore.theme;
});
const topMenu = computed(() => appStore.topMenu && appStore.menu);
const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
        // overridden default behavior
        appStore.toggleTheme(dark);
    },
});
const toggleTheme = useToggle(isDark);
const handleToggleTheme = () => {
    toggleTheme();
};
const setVisible = () => {
    appStore.updateSettings({ globalSettings: true });
};
const refBtn = ref();
const triggerBtn = ref();
const setPopoverVisible = () => {
    const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    });
    refBtn.value.dispatchEvent(event);
};
const handleLogout = () => {
    logout();
};
const setDropDownVisible = () => {
    const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    });
    triggerBtn.value.dispatchEvent(event);
};
const switchRoles = async () => {
    const res = await userStore.switchRoles();
    Message.success(res as string);
};
const toggleDrawerMenu = inject('toggleDrawerMenu') as () => void;
</script>

<style scoped lang="less">
.navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
}

.left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
}

.center-side {
    flex: 1;
}

.right-side {
    display: flex;
    padding-right: 20px;
    list-style: none;
    :deep(.locale-select) {
        border-radius: 20px;
    }
    li {
        display: flex;
        align-items: center;
        padding: 0 10px;
    }

    a {
        color: var(--color-text-1);
        text-decoration: none;
    }
    .nav-btn {
        border-color: rgb(var(--gray-2));
        color: rgb(var(--gray-8));
        font-size: 16px;
    }
    .trigger-btn,
    .ref-btn {
        position: absolute;
        bottom: 14px;
    }
    .trigger-btn {
        margin-left: 14px;
    }
}
</style>

<style lang="less">
.message-popover {
    .arco-popover-content {
        margin-top: 0;
    }
}
</style>
