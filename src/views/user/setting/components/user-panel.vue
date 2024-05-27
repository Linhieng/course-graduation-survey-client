<template>
    <a-card :bordered="false">
        <a-space :size="54">
            <a-upload
                :custom-request="customRequest"
                list-type="picture-card"
                :file-list="fileList"
                :show-upload-button="true"
                :show-file-list="false"
                @change="uploadChange"
            >
                <template #upload-button>
                    <a-avatar :size="100" class="info-avatar" :imageUrl="fileList[0].url" object-fit="cover">
                        <template #trigger-icon>
                            <icon-camera />
                        </template>
                        <!-- <img v-if="fileList.length" :src="fileList[0].url" /> -->
                    </a-avatar>
                </template>
            </a-upload>
            <a-descriptions
                :data="renderData as any"
                :column="2"
                align="right"
                layout="inline-horizontal"
                :label-style="{
                    width: '160px',
                    fontWeight: 'normal',
                    color: 'rgb(var(--gray-8))',
                }"
                :value-style="{
                    width: '240px',
                    paddingLeft: '8px',
                    marginBottom: '12px',
                    textAlign: 'left',
                }"
            >
                <template #label="{ label }">{{ $t(label) }} :</template>
                <template #value="{ value, data }">
                    <a-tag size="large" :color="data.label === '登录名' ? 'blue' : 'gray'">
                        {{ value }}
                    </a-tag>
                </template>
            </a-descriptions>
        </a-space>
    </a-card>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import type { FileItem, RequestOption } from '@arco-design/web-vue/es/upload/interfaces';
import { useUserStore } from '@/store';
import { userUploadApi } from '@/api/user-center';
import { msgError } from '@/utils/msg';
import NProgress from 'nprogress';

const userStore = useUserStore();
const file = {
    uid: '-2',
    name: 'avatar.png',
    url: userStore.avatar,
};
const renderData = computed(() => [
    {
        label: '登录名',
        value: userStore.username,
    },
    {
        label: '用户 ID',
        value: userStore.accountId,
    },
    {
        label: '用户姓名',
        value: userStore.name,
    },
    {
        label: '用户手机',
        value: userStore.phone,
    },
    {
        label: '注册时间',
        value: new Date(userStore.registrationDate || '').toLocaleString(),
    },
]);
const fileList = ref<FileItem[]>([file]);
const uploadChange = (fileItemList: FileItem[], fileItem: FileItem) => {
    // 这里获得的 fileItem 是本地的
    fileList.value = [fileItem];
};
const customRequest = (options: RequestOption) => {
    // docs: https://axios-http.com/docs/cancellation
    const controller = new AbortController();

    (async function requestWrap() {
        const { onProgress, onError, onSuccess, fileItem, name = 'file' } = options;
        onProgress(20);
        const formData = new FormData();
        formData.append(name as string, fileItem.file as Blob);
        const onUploadProgress = (event: ProgressEvent) => {
            let percent;
            if (event.total > 0) {
                percent = (event.loaded / event.total) * 100;
            }
            onProgress(parseInt(String(percent), 10), event);
        };

        NProgress.start();
        try {
            // 报错 TypeError: request.upload.addEventListener is not a function
            // 请见： https://github.com/axios/axios/issues/1630
            //       https://github.com/nuysoft/Mock/issues/127

            const res = await userUploadApi(formData, {
                controller,
                onUploadProgress,
            });
            if (res.ok) {
                onSuccess(res);
                userStore.updateUserInfo({ avatar: res.data.url });
            } else {
                onError(res);
                msgError(res.msg);
            }
        } catch (error) {
            onError(error);
        }
        NProgress.done();
    })();
    return {
        abort() {
            controller.abort();
        },
    };
};
</script>

<style scoped lang="scss">
.arco-card {
    padding: 14px 0 4px 4px;
    border-radius: 4px;
}
:deep(.arco-avatar-trigger-icon-button) {
    width: 32px;
    height: 32px;
    line-height: 32px;
    background-color: #e8f3ff;
    .arco-icon-camera {
        margin-top: 8px;
        color: rgb(var(--arcoblue-6));
        font-size: 14px;
    }
}
</style>
