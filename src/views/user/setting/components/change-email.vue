<template>
    <div class="form-wrapper">
        <div class="form-title">请邮箱手机</div>
        <div class="form-sub-title">请填写下面信息</div>
        <div class="form-error-msg">{{ errorMessage }}</div>
        <a-form :model="formData" class="signup-form" layout="vertical" @submit="clickChange">
            <a-form-item
                field="email"
                :rules="[
                    {
                        required: true,
                        message: $t('不能为空'),
                    },
                ]"
                :validate-trigger="['change', 'blur']"
                hide-label
            >
                <a-input v-model="formData.email" :placeholder="$t('输入新邮箱')" allow-clear>
                    <template #prefix>
                        <icon-phone />
                    </template>
                </a-input>
            </a-form-item>
            <a-space :size="16" direction="vertical">
                <a-button type="primary" html-type="submit" long :loading="loading">
                    {{ $t('点击修改邮箱') }}
                </a-button>
            </a-space>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { changePassword, signup, updateUserInfo } from '@/api/user';
import { msgSuccess } from '@/utils/msg';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '@/store';

const emit = defineEmits<{
    (e: 'over'): void;
}>();
const { t } = useI18n();
const errorMessage = ref('');
const { loading, setLoading } = useLoading();
const passwordValidateStatus = ref();
const passwordHelp = ref('');

const formData = reactive({
    email: '',
});

watch(
    () => [formData.email],
    () => {
        errorMessage.value = '';
        passwordValidateStatus.value = undefined;
        passwordHelp.value = '';
    },
);

const clickChange = async ({ errors }: { errors: Record<string, ValidatedError> | undefined }) => {
    if (loading.value) return;
    if (!errors) {
        if (!formData.email.includes('@')) {
            errorMessage.value = t('邮箱格式错误');
            return;
        }

        setLoading(true);
        const res = await updateUserInfo({
            email: formData.email,
        });
        useUserStore().info();
        setLoading(false);
        if (!res.ok) {
            errorMessage.value = t(res.msg);
        } else {
            msgSuccess('修改成功');
            emit('over');
        }
    }
};
</script>

<style lang="less" scoped>
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
