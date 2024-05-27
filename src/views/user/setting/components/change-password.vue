<template>
    <div class="form-wrapper">
        <div class="form-title">{{ $t('请修改密码') }}</div>
        <div class="form-sub-title">{{ $t('请填写下面信息') }}</div>
        <div class="form-error-msg">{{ errorMessage }}</div>
        <a-form ref="signupForm" :model="formData" class="signup-form" layout="vertical" @submit="clickChange">
            <a-form-item
                field="oldPassword"
                :rules="[
                    {
                        required: true,
                        message: $t('不能为空'),
                    },
                ]"
                :validate-trigger="['change', 'blur']"
                hide-label
            >
                <a-input-password v-model="formData.oldPassword" :placeholder="$t('输入旧密码')" allow-clear>
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-form-item
                field="newPassword"
                :rules="[
                    {
                        required: true,
                        message: $t('不能为空'),
                    },
                ]"
                :validate-trigger="['change', 'blur']"
                hide-label
                :validate-status="passwordValidateStatus"
                :help="passwordHelp"
                feedback
            >
                <a-input-password v-model="formData.newPassword" :placeholder="$t('输入新密码')" allow-clear>
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-form-item
                field="newPassword2"
                :rules="[
                    {
                        required: true,
                        message: $t('不能为空'),
                    },
                ]"
                :validate-trigger="['change', 'blur']"
                hide-label
                :validate-status="passwordValidateStatus"
                :help="passwordHelp"
                feedback
            >
                <a-input-password v-model="formData.newPassword2" :placeholder="$t('再次输入新密码')" allow-clear>
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-space :size="16" direction="vertical">
                <a-button type="primary" html-type="submit" long :loading="loading">
                    {{ $t('点击修改密码') }}
                </a-button>
            </a-space>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import type { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { changePassword } from '@/api/user';
import { msgSuccess } from '@/utils/msg';
import { useStorage } from '@vueuse/core';

const emit = defineEmits<{
    (e: 'over'): void;
}>();
const { t } = useI18n();
const errorMessage = ref('');
const { loading, setLoading } = useLoading();
const passwordValidateStatus = ref();
const passwordHelp = ref('');

interface FormData {
    oldPassword: string;
    newPassword: string;
    newPassword2: string;
}
const formData = reactive({
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
});

watch(
    () => [formData.oldPassword, formData.newPassword, formData.newPassword2],
    () => {
        errorMessage.value = '';
        passwordValidateStatus.value = undefined;
        passwordHelp.value = '';
    },
);

const clickChange = async ({ errors }: { errors: Record<string, ValidatedError> | undefined }) => {
    if (loading.value) return;
    if (!errors) {
        if (formData.newPassword !== formData.newPassword2) {
            passwordHelp.value = '密码不一致';
            passwordValidateStatus.value = 'error';
            return;
        }

        setLoading(true);
        const res = await changePassword({
            newPassword: formData.newPassword,
            oldPassword: formData.oldPassword,
        });
        setLoading(false);
        if (!res.ok) {
            errorMessage.value = t(res.msg);
        } else {
            msgSuccess('修改成功');
            emit('over');
            const loginConfig = useStorage('login-config', {
                rememberPassword: true,
                password: '',
            });
            if (loginConfig.value.rememberPassword) {
                loginConfig.value.password = formData.newPassword;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.form {
    &-wrapper {
        width: 320px;
    }

    &-title {
        color: var(--color-text-1);
        font-weight: 500;
        font-size: 24px;
        line-height: 32px;
    }

    &-sub-title {
        color: var(--color-text-3);
        font-size: 16px;
        line-height: 24px;
    }

    &-error-msg {
        height: 32px;
        color: rgb(var(--red-6));
        line-height: 32px;
    }

    &-password-actions {
        display: flex;
        justify-content: space-between;
    }

    &-register-btn {
        color: var(--color-text-3) !important;
    }
}
</style>
