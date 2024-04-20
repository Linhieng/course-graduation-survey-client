<script setup lang="ts">
import { useAppStore } from '@/store';

const appStore = useAppStore();
const toggleFocusMode = () => {
    if (appStore.focusMode) {
        appStore.focusMode = false;
        appStore.updateSettings({
            navbar: true,
            menu: true,
            footer: true,
            tabBar: true,
        });
    } else {
        appStore.focusMode = true;
        appStore.updateSettings({
            navbar: false,
            menu: false,
            footer: false,
            tabBar: false,
        });
    }
};
</script>

<template>
    <div class="container">
        <div class="header">
            <a-button class="left" type="primary" @click="toggleFocusMode">{{
                appStore.focusMode ? $t('取消聚焦模式') : $t('聚焦模式')
            }}</a-button>
            <a-space size="large">
                <a-button shape="circle">
                    <icon-font style="width: 20px; height: 20px" name="skin"></icon-font
                ></a-button>
                <a-button shape="circle">
                    <icon-font style="width: 20px; height: 20px" name="settings"></icon-font>
                </a-button>
                <a-button type="primary">
                    <template #icon>
                        <icon-font name="publish"></icon-font>
                    </template>
                    <template #default>{{ $t('发布') }}</template>
                </a-button>
            </a-space>
        </div>
        <div class="main">
            <div class="workplace"> 创建文件 </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.container {
    min-width: 100%;
    min-height: 100%;

    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 10px;
    }
}
</style>
