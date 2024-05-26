<template>
    <div class="login-form-wrapper">
        <div class="max-content login-form-title">{{ $t('欢迎使用问卷系统') }}</div>
        <div class="max-content login-form-sub-title">{{ $t('请先登录') }}</div>
        <div class="max-content login-form-error-msg">{{ errorMessage }}</div>
        <a-form ref="loginForm" :model="userInfo" class="login-form" layout="vertical" @submit="handleSubmit">
            <a-form-item
                field="username"
                :rules="[{ required: true, message: $t('用户名不能为空') }]"
                :validate-trigger="['change', 'blur']"
                hide-label
            >
                <a-input v-model="userInfo.username" :placeholder="$t('请输入用户名')">
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item
                field="password"
                :rules="[{ required: true, message: $t('密码不能为空') }]"
                :validate-trigger="['change', 'blur']"
                hide-label
            >
                <a-input-password v-model="userInfo.password" :placeholder="$t('请输入密码')" allow-clear>
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-space :size="16" direction="vertical">
                <div class="login-form-password-actions">
                    <a-checkbox
                        checked="rememberPassword"
                        :model-value="loginConfig.rememberPassword"
                        @change="setRememberPassword"
                    >
                        <span style="display: inline-block; width: max-content">{{ $t('记住账号和密码') }}</span>
                    </a-checkbox>
                </div>
                <a-button type="primary" html-type="submit" long :loading="loading">
                    {{ $t('点击登录') }}
                </a-button>
                <a-button type="text" long class="login-form-register-btn" @click="registerVisible = true">
                    {{ $t('还没账号？请先注册') }}
                </a-button>
            </a-space>
        </a-form>
    </div>
    <a-modal v-model:visible="registerVisible" draggable ok-text="已注册" cancel-text="取消">
        <template #title>注册账户</template>
        <div>
            <signup-form></signup-form>
        </div>
    </a-modal>
</template>

<script lang="ts" setup>
import SignupForm from './signup-form.vue';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import type { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { useI18n } from 'vue-i18n';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '@/store';
import useLoading from '@/hooks/loading';
import type { LoginData } from '@/api/user';
import { msgSuccess } from '@/utils/msg';

const router = useRouter();
const { t } = useI18n();
const errorMessage = ref('');
const { loading, setLoading } = useLoading();
const userStore = useUserStore();

const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: 'admin', // 演示默认值
    password: 'admin', // demo default value
});
const userInfo = reactive({
    username: loginConfig.value.username,
    password: loginConfig.value.password,
});

const handleSubmit = async ({
    errors,
    values,
}: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
}) => {
    if (loading.value) return;
    if (!errors) {
        setLoading(true);
        const ok = await userStore.login(values as LoginData);
        setLoading(false);

        if (ok) {
            let { redirect, ...othersQuery } = router.currentRoute.value.query;
            // 这里没有传递 survey id 时，vue-router 直接不允许跳转，导致卡死在登录界面
            // 除非修正状态栏的值。但用户可不懂这些。
            if (redirect === 'collect-table') {
                redirect = 'collect-entry';
            } else if (redirect === 'login') {
                // 解决登录后依旧停留在登录界面的问题
                redirect = 'Workplace';
            } else if (redirect === 'Create') {
                redirect = 'Workplace';
            } else if (!redirect || redirect.length === 0) {
                redirect = 'Workplace';
            }
            const nextName = redirect as string;
            router.push({
                name: nextName,
                query: {
                    ...othersQuery,
                },
            });
            msgSuccess('login.form.login.success');
            const { rememberPassword } = loginConfig.value;
            const { username, password } = values;
            // 实际生产环境需要进行加密存储。
            // The actual production environment requires encrypted storage.
            loginConfig.value.username = rememberPassword ? username : '';
            loginConfig.value.password = rememberPassword ? password : '';
        }
    }
};
const setRememberPassword: any = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
};

//
const registerVisible = ref(false);
</script>

<style lang="scss" scoped>
.login-form {
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

.max-content {
    width: max-content;
}
</style>
