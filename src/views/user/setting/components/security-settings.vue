<script lang="ts" setup>
import ChangePassword from './change-password.vue';
import ChangePhone from './change-phone.vue';
import ChangeEmail from './change-email.vue';
import { ref } from 'vue';
import { useUserStore } from '@/store';

const showHandleUpdatePasswordDialog = ref(false);
const showHandleChangePhoneDialog = ref(false);
const showHandleChangeEmailDialog = ref(false);
</script>

<template>
    <a-list :bordered="false">
        <a-list-item>
            <a-list-item-meta>
                <template #avatar>
                    <a-typography-paragraph>
                        {{ $t('userSetting.SecuritySettings.form.label.password') }}
                    </a-typography-paragraph>
                </template>
                <template #description>
                    <div class="content">
                        <a-typography-paragraph>
                            {{ $t('userSetting.SecuritySettings.placeholder.password') }}
                        </a-typography-paragraph>
                    </div>
                    <div class="operation">
                        <a-link @click="showHandleUpdatePasswordDialog = true">
                            {{ $t('userSetting.SecuritySettings.button.update') }}
                        </a-link>
                    </div>
                </template>
            </a-list-item-meta>
        </a-list-item>
        <a-list-item>
            <a-list-item-meta>
                <template #avatar>
                    <a-typography-paragraph>
                        {{ $t('userSetting.SecuritySettings.form.label.phone') }}
                    </a-typography-paragraph>
                </template>
                <template #description>
                    <div class="content">
                        <a-typography-paragraph>
                            {{
                                useUserStore().userInfo.phone === ''
                                    ? $t('未绑定手机')
                                    : $t('已绑定：') + useUserStore().userInfo.phone
                            }}
                        </a-typography-paragraph>
                    </div>
                    <div class="operation">
                        <a-link @click="showHandleChangePhoneDialog = true">
                            {{ $t('userSetting.SecuritySettings.button.update') }}
                        </a-link>
                    </div>
                </template>
            </a-list-item-meta>
        </a-list-item>
        <a-list-item>
            <a-list-item-meta>
                <template #avatar>
                    <a-typography-paragraph>
                        {{ $t('userSetting.SecuritySettings.form.label.email') }}
                    </a-typography-paragraph>
                </template>
                <template #description>
                    <div class="content">
                        <template v-if="useUserStore().userInfo.email?.trim() === ''">
                            <a-typography-paragraph class="tip">
                                {{ $t('你还没有设置邮箱') }}
                            </a-typography-paragraph>
                        </template>
                        <template v-else>
                            <a-typography-paragraph class="tip">
                                {{ $t('当前安全邮箱为：') + useUserStore().userInfo.email }}
                            </a-typography-paragraph>
                        </template>
                    </div>
                    <div class="operation">
                        <a-link @click="showHandleChangeEmailDialog = true">
                            {{ $t('userSetting.SecuritySettings.button.update') }}
                        </a-link>
                    </div>
                </template>
            </a-list-item-meta>
        </a-list-item>
    </a-list>

    <a-modal v-model:visible="showHandleUpdatePasswordDialog" draggable>
        <template #title> {{ $t('修改密码') }} </template>
        <div>
            <change-password @over="showHandleUpdatePasswordDialog = false"></change-password>
        </div>
    </a-modal>
    <a-modal v-model:visible="showHandleChangePhoneDialog" draggable>
        <template #title> {{ $t('修改手机') }} </template>
        <div>
            <change-phone @over="showHandleChangePhoneDialog = false"></change-phone>
        </div>
    </a-modal>
    <a-modal v-model:visible="showHandleChangeEmailDialog" draggable>
        <template #title> {{ $t('修改邮箱') }} </template>
        <div>
            <change-email @over="showHandleChangeEmailDialog = false"></change-email>
        </div>
    </a-modal>
</template>

<style scoped lang="less">
:deep(.arco-list-item) {
    border-bottom: none !important;
    .arco-typography {
        margin-bottom: 20px;
    }
    .arco-list-item-meta-avatar {
        margin-bottom: 1px;
    }
    .arco-list-item-meta {
        padding: 0;
    }
}
:deep(.arco-list-item-meta-content) {
    flex: 1;
    border-bottom: 1px solid var(--color-neutral-3);

    .arco-list-item-meta-description {
        display: flex;
        flex-flow: row;
        justify-content: space-between;

        .tip {
            color: rgb(var(--gray-6));
        }
        .operation {
            margin-right: 6px;
        }
    }
}
</style>
