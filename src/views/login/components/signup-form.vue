<template>
    <div class="signup-form-wrapper">
        <div class="signup-form-title">{{ $t('欢迎注册问卷系统账号') }}</div>
        <div class="signup-form-sub-title">{{ $t('请填写下面信息') }}</div>
        <div class="signup-form-info" :class="{ red: !signSuccess, primary: signSuccess }">{{ formTopMessage }}</div>
        <a-form ref="signupForm" :model="formData" class="signup-form" layout="vertical" @submit="clickRegister">
            <a-form-item
                field="username"
                :rules="[
                    {
                        required: true,
                        message: $t('用户名不能为空'),
                    },
                ]"
                :validate-trigger="['change', 'blur']"
                hide-label
            >
                <a-input v-model="formData.username" :placeholder="$t('请输入用户名')">
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item
                field="password"
                :rules="[
                    {
                        required: true,
                        message: $t('密码不能为空'),
                    },
                ]"
                :validate-trigger="['change', 'blur']"
                hide-label
                :validate-status="passwordValidateStatus"
                :help="$t(passwordHelp)"
                feedback
            >
                <a-input-password v-model="formData.password" :placeholder="$t('请输入密码')" allow-clear>
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-form-item
                field="password2"
                :rules="[
                    {
                        required: true,
                        message: $t('密码不能为空'),
                    },
                ]"
                :validate-trigger="['change', 'blur']"
                hide-label
                :validate-status="passwordValidateStatus"
                :help="$t(passwordHelp)"
                feedback
            >
                <a-input-password v-model="formData.password2" :placeholder="$t('请再次输入密码')" allow-clear>
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-space :size="16" direction="vertical">
                <a-button type="primary" html-type="submit" long :loading="loading">{{ $t('点击注册') }}</a-button>
            </a-space>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import type { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { signup } from '@/api/user';
import { msgSuccess } from '@/utils/msg';

const { t } = useI18n();
const formTopMessage = ref(' ');
const signSuccess = ref(false);
const { loading, setLoading } = useLoading();
const passwordValidateStatus = ref();
const passwordHelp = ref(' ');

interface FormData {
    username: string;
    password: string;
    password2: string;
}
const formData = reactive({
    username: '',
    password: '',
    password2: '',
});

watch(
    () => [formData.password, formData.password2, formData.username],
    () => {
        formTopMessage.value = ' ';
        passwordValidateStatus.value = undefined;
        passwordHelp.value = ' ';
    },
);

const clickRegister = async ({
    errors,
    values,
}: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
}) => {
    if (loading.value) return;
    if (!errors) {
        if (values.password !== values.password2) {
            passwordHelp.value = '密码不一致';
            passwordValidateStatus.value = 'error';
            return;
        }

        setLoading(true);
        const res = await signup(values as FormData);
        setLoading(false);
        if (res.ok) {
            msgSuccess('注册成功');
            signSuccess.value = true;
            formTopMessage.value = t('注册成功');
        } else {
            formTopMessage.value = t(res.msg);
        }
    }
};
</script>

<style lang="scss" scoped>
.signup-form {
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

    &-info {
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
.red {
    color: rgb(var(--red-6));
}
.primary {
    color: cornflowerblue;
}
</style>
