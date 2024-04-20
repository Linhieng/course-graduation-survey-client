<script setup lang="ts">
const api_base_url = import.meta.env.VITE_API_BASE_URL;
import { useCreateStore } from '@/store';
import { getToken } from '@/utils/auth';
import { FileItem } from '@arco-design/web-vue';

const uploadSuccess = (fileItem: FileItem) => {
    const url = fileItem.response?.data.url;
    useCreateStore().updateBgUrl(url);
};
</script>

<template>
    <div class="container">
        <a-space direction="vertical">
            <template #split>
                <a-divider direction="horizontal" margin="7px" />
            </template>
            <a-space>
                <span>{{ $t('选择背景图片：') }}</span>
                <a-upload
                    @success="uploadSuccess"
                    :limit="1"
                    :action="api_base_url + '/api/other/upload-public'"
                    :headers="{
                        Authorization: `Bearer ${getToken()}`,
                    }"
                />
            </a-space>
            <a-space direction="vertical">
                <span>{{ $t('图片填充模式：') }}</span>
                <a-radio-group type="button" v-model="useCreateStore().skin.bg_object_fit">
                    <a-radio value="contain">contain</a-radio>
                    <a-radio value="cover">cover</a-radio>
                    <a-radio value="fill">fill</a-radio>
                    <a-radio value="none">none</a-radio>
                </a-radio-group>
            </a-space>
            <a-space direction="vertical">
                <span>{{ $t('图片位置') }}</span>
                <a-radio-group v-model="useCreateStore().skin.bg_position" type="button">
                    <div class="grid-9">
                        <a-radio class="grid-9-item" value="leftTop">⬉</a-radio>
                        <a-radio class="grid-9-item" value="centerTop">⬆</a-radio>
                        <a-radio class="grid-9-item" value="rightTop">⬈</a-radio>
                        <a-radio class="grid-9-item" value="leftCenter">⬅</a-radio>
                        <a-radio class="grid-9-item" value="centerCenter">〇</a-radio>
                        <a-radio class="grid-9-item" value="rightCenter">➔</a-radio>
                        <a-radio class="grid-9-item" value="leftBottom">⬋</a-radio>
                        <a-radio class="grid-9-item" value="centerBottom">⬇</a-radio>
                        <a-radio class="grid-9-item" value="rightBottom">⬊</a-radio>
                    </div>
                </a-radio-group>
            </a-space>
            <a-space direction="vertical">
                <span>{{ $t('背景图片大小') }}</span>
                <el-button @click="useCreateStore().resetBgWidth()">{{ $t('重置') }}</el-button>
                <a-slider
                    :min="30"
                    :max="100"
                    :default-value="50"
                    @change="(val:any) => useCreateStore().updateBgWidth(val + '%')"
                    :style="{ width: '200px' }"
                    :format-tooltip="(val:number) => `${Math.round(val)}%`"
                />
            </a-space>
            <!-- <a-space direction="vertical">
                <span>{{ $t('背景颜色') }}</span>
                2.55.0
                <a-color-picker @change="(val:any) => useCreateStore().updateBgColor(val)" />
            </a-space> -->
        </a-space>
    </div>
</template>

<style scoped lang="less">
.grid-9 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    &-item {
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
