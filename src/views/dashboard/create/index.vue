<script setup lang="ts">
import { useAppStore, useCreateStore } from '@/store';
const createStore = useCreateStore();
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
    <div class="container" :class="{ focusMode: appStore.focusMode }">
        <div class="header">
            <a-button class="left header-item" type="primary" @click="toggleFocusMode">{{
                appStore.focusMode ? $t('取消聚焦模式') : $t('聚焦模式')
            }}</a-button>
            <a-space class="header-item" size="large">
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
            <div class="workplace">
                <img :src="createStore.skin.background_image" alt="" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.container.focusMode {
    height: 100vh;
}
.container {
    min-width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;

    position: relative;

    .header {
        position: absolute;
        top: 0;
        width: 100%;
        left: 0;

        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 10px;

        // 实现亚克力效果、毛玻璃
        background-color: #f6f8fc99;
        overflow: hidden;
        z-index: 10;
        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size: cover;
            filter: blur(20px);
            z-index: 1;
        }
        &-item {
            z-index: 2;
        }
    }
    .workplace {
        flex: 1 0 auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto; /* 垂直方向溢出时显示滚动条 */
        &::-webkit-scrollbar {
            width: 0;
        }
        img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>
