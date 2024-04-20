<script setup lang="ts">
import { useAppStore, useCreateStore } from '@/store';
import { computed, ref } from 'vue';
import EditSkin from './components/EditSkin.vue';
import EditSurvey from './components/EditSurvey.vue';
const createStore = useCreateStore();
const appStore = useAppStore();
const visibleEditSkin = ref(false);

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

const drawerPosition = computed(() => {
    if (createStore.skin.survey_position === 'left') return 'right';
    if (createStore.skin.survey_position === 'right') return 'left';
    return 'right';
});
</script>

<template>
    <div class="container" :class="{ focusMode: appStore.focusMode }">
        <div class="header acrylic">
            <a-space style="margin-left: 20px">
                <a-button class="left header-item" type="primary" @click="toggleFocusMode">{{
                    appStore.focusMode ? $t('取消聚焦模式') : $t('聚焦模式')
                }}</a-button>
            </a-space>
            <a-space style="margin-right: 20px" class="header-item" size="large">
                <a-tooltip :content="$t('皮肤')">
                    <a-button shape="circle" @click="visibleEditSkin = true">
                        <icon-font style="width: 20px; height: 20px" name="skin"></icon-font
                    ></a-button>
                </a-tooltip>
                <a-tooltip :content="$t('设置')">
                    <a-button shape="circle">
                        <icon-font style="width: 20px; height: 20px" name="settings"></icon-font>
                    </a-button>
                </a-tooltip>
                <a-divider direction="vertical" />

                <a-tooltip :content="$t('预览')">
                    <a-button type="primary" shape="circle">
                        <template #icon>
                            <icon-font name="view"></icon-font>
                        </template>
                    </a-button>
                </a-tooltip>
                <a-button type="primary">
                    <template #icon>
                        <icon-font name="publish"></icon-font>
                    </template>
                    <template #default>{{ $t('发布') }}</template>
                </a-button>
            </a-space>
        </div>
        <div class="create-container not-show-scroll">
            <div
                class="img-cover"
                :class="[createStore.skin.bg_position]"
                :style="{
                    backgroundColor: createStore.skin.bg_color,
                }"
            >
                <img
                    v-show="createStore.skin.background_image && createStore.skin.background_image !== ''"
                    :src="createStore.skin.background_image"
                    :style="{
                        objectFit: createStore.skin.bg_object_fit,
                        width: createStore.skin.bg_width,
                        // backgroundColor: createStore.skin.bg_color,
                    }"
                />
            </div>
            <div class="b not-show-scroll">
                <div
                    class="workplace-box acrylic"
                    :style="{
                        width: createStore.skin.survey_width,
                    }"
                    :class="[createStore.skin.survey_position]"
                >
                    <EditSurvey />
                </div>
            </div>
        </div>
        <a-drawer
            :placement="drawerPosition"
            :width="340"
            :visible="visibleEditSkin"
            @ok="visibleEditSkin = false"
            @cancel="visibleEditSkin = false"
        >
            <template #title>
                <h3>{{ $t('自定义皮肤') }}</h3>
            </template>
            <div> <EditSkin /> </div>
        </a-drawer>
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

    --header-height: 60px;
    .header {
        position: absolute;
        top: 0;
        width: 100%;
        height: var(--header-height);
        left: 0;

        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        &-item {
            z-index: 2;
        }
    }
    .create-container {
        flex: 1 0 auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto; /* 垂直方向溢出时显示滚动条 */
        .img-cover {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            display: flex;
            overflow: hidden;
        }
        .img-cover.reset {
            display: block;
            img {
                width: 100%;
                height: 100%;
            }
        }
        img {
            width: 100%;
            height: max-content;
        }
    }
    .b {
        position: absolute;
        top: var(--header-height);
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
        .workplace-box {
            // margin-top: 100px;
            width: 60%;
            z-index: 20;
            opacity: 0.7;
        }
        .left {
            margin-left: 0;
            margin-right: auto;
            padding-left: 100px;
        }
        .right {
            margin-left: auto;
            margin-right: 0;
            padding-right: 100px;
        }
        .center {
            margin-left: auto;
            margin-right: auto;
        }
    }
}

.not-show-scroll {
    &::-webkit-scrollbar {
        width: 0;
    }
}

.leftTop {
    align-items: top;
    justify-content: left;
}
.leftCenter {
    align-items: center;
    justify-content: left;
}
.leftBottom {
    align-items: end;
    justify-content: left;
}
.centerTop {
    align-items: top;
    justify-content: center;
}
.centerCenter {
    align-items: center;
    justify-content: center;
}
.centerBottom {
    align-items: end;
    justify-content: center;
}
.rightTop {
    align-items: top;
    justify-content: end;
}
.rightCenter {
    align-items: center;
    justify-content: end;
}
.rightBottom {
    align-items: end;
    justify-content: end;
}

.acrylic {
    // 实现亚克力效果、毛玻璃
    background-color: #f6f8fc99;
    overflow: hidden;
    z-index: 1;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        filter: blur(20px);
        z-index: -1;
    }
}
</style>
