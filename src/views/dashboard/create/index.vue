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
            <a-space>
                <a-button>皮肤</a-button>
                <a-button>设置</a-button>
                <a-button>发布</a-button>
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
