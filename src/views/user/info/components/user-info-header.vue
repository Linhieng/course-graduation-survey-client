<template>
    <div class="header" :style="{ '--bg-url': `url(${bg})` }">
        <a-space :size="12" direction="vertical" align="center">
            <a-avatar :size="64" @click="gotoSettings" :imageUrl="userInfo.avatar" object-fit="cover">
                <template #trigger-icon>
                    <icon-camera />
                </template>
            </a-avatar>
            <a-typography-title :heading="6" style="margin: 0; text-shadow: 0 0 4px white">
                {{ userInfo.name }}
            </a-typography-title>
            <div class="user-msg">
                <a-space :size="18">
                    <div>
                        <icon-user />
                        <a-typography-text>{{ userInfo.jobName }}</a-typography-text>
                    </div>
                    <div>
                        <icon-home />
                        <a-typography-text>
                            {{ userInfo.organizationName }}
                        </a-typography-text>
                    </div>
                    <div>
                        <icon-location />
                        <a-typography-text>{{ userInfo.locationName }}</a-typography-text>
                    </div>
                </a-space>
            </div>
        </a-space>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store';
import bg from '@/assets/images/bg.png';
import { useRouter } from 'vue-router';
const router = useRouter();
const userInfo = useUserStore();

const gotoSettings = () => {
    router.push({ name: 'Setting' });
};
</script>

<style scoped lang="less">
.header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 204px;
    color: var(--gray-10);
    background: var(--bg-url) no-repeat;
    background-size: cover;
    border-radius: 4px;

    :deep(.arco-avatar-trigger-icon-button) {
        color: rgb(var(--arcoblue-6));

        :deep(.arco-icon) {
            vertical-align: -1px;
        }
    }
    .user-msg {
        .arco-icon {
            color: rgb(var(--gray-10));
        }
        .arco-typography {
            margin-left: 6px;
        }
    }
}
</style>
