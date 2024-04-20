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
        <a-space>
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
        </a-space>
    </div>
</template>
