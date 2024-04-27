<template>
    <div v-if="!appStore.navbar && !appStore.focusMode" class="fixed-settings" @click="setVisible">
        <a-button type="primary">
            <template #icon>
                <icon-settings />
            </template>
        </a-button>
    </div>
    <a-drawer
        :width="300"
        unmount-on-close
        :visible="visible"
        hide-cancel
        :footer="false"
        :cancel-text="$t('settings.close')"
        :ok-text="$t('settings.copySettings')"
        @ok="copySettings"
        @cancel="cancel"
    >
        <template #title>{{ $t('界面设置') }}</template>
        <Block :options="contentOpts" :title="$t('可配置的内容：')" />
        <!-- <Block :options="othersOpts" :title="$t('settings.otherSettings')" /> -->
        <!-- <a-alert>{{ $t('settings.alertContent') }}</a-alert> -->
    </a-drawer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useI18n } from 'vue-i18n';
import { useClipboard } from '@vueuse/core';
import { useAppStore } from '@/store';
import Block from './block.vue';

const emit = defineEmits(['cancel']);

const appStore = useAppStore();
const { t } = useI18n();
const { copy } = useClipboard();
const visible = computed(() => appStore.globalSettings);
const contentOpts = computed(() => [
    { name: '是否显示顶部栏', key: 'navbar', defaultVal: appStore.navbar },
    {
        name: '是否显示侧边栏',
        key: 'menu',
        defaultVal: appStore.menu,
    },
    {
        name: '侧边栏移到顶部',
        key: 'topMenu',
        defaultVal: appStore.topMenu,
    },
    { name: '是否显示底部', key: 'footer', defaultVal: appStore.footer },
    { name: '是否显示标签页', key: 'tabBar', defaultVal: appStore.tabBar },
    // {
    //     name: 'settings.menuFromServer',
    //     key: 'menuFromServer',
    //     defaultVal: appStore.menuFromServer,
    // },
    {
        name: '侧边栏宽度',
        key: 'menuWidth',
        defaultVal: appStore.menuWidth,
        type: 'number',
    },
]);
const othersOpts = computed(() => [
    {
        name: 'settings.colorWeak',
        key: 'colorWeak',
        defaultVal: appStore.colorWeak,
    },
]);

const cancel = () => {
    appStore.updateSettings({ globalSettings: false });
    emit('cancel');
};
const copySettings = async () => {
    const text = JSON.stringify(appStore.$state, null, 2);
    await copy(text);
    Message.success(t('settings.copySettings.message'));
};
const setVisible = () => {
    appStore.updateSettings({ globalSettings: true });
};
</script>

<style scoped lang="less">
.fixed-settings {
    position: fixed;
    top: 280px;
    right: 0;

    svg {
        font-size: 18px;
        vertical-align: -4px;
    }
}
</style>
