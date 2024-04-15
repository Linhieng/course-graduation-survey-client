<template>
    <el-form
        label-width="auto"
        :model="formLogin"
        style="max-width: 600px"
        ref="formRef"
        :rules="formRules"
    >
        <el-form-item :label="$t('login.form.label.userName')" prop="username">
            <el-input v-model="formLogin.username" />
        </el-form-item>
        <el-form-item :label="$t('login.form.label.password')" prop="password">
            <el-input v-model="formLogin.password" type="password" />
        </el-form-item>
        <el-form-item :label="$t('login.form.rememberPassword')">
            <el-switch v-model="loginConfig.rememberPassword" />
        </el-form-item>

        <el-form-item>
            <el-button
                type="primary"
                @click="submitForm(formRef)"
                :loading="loading"
            >
                {{ $t('login.form.login') }}
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import useLoading from '@/hooks/loading'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store'
import type { FormInstance, FormRules } from 'element-plus'
import type { LoginData } from '@/api/user'
import { msgError } from '@/utils'

const userStore = useUserStore()
const { t } = useI18n()
const { loading, setLoading } = useLoading()

const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: 'alan', // 演示
    password: '1234', // 演示
})

const formRef = ref(null)
const formRules = reactive<FormRules>({
    username: [
        {
            required: true,
            message: t('login.form.userName.errMsg'),
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: t('login.form.password.errMsg'),
            trigger: 'blur',
        },
    ],
})
const formLogin = reactive({
    username: loginConfig.value.username,
    password: loginConfig.value.password || '',
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    if (loading.value) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            submit()
        } else {
            console.log('error submit!', fields)
        }
    })
}
const submit = async () => {
    if (loading.value) return
    setLoading(true)

    try {
        await userStore.login({
            username: formLogin.username,
            password: formLogin.password,
        } as LoginData)
        // const { redirect, ...othersQuery } = router.currentRoute.value.query
        // router.push({
        //     name: (redirect as string) || 'Workplace',
        //     query: {
        //         ...othersQuery,
        //     },
        // })
        // Message.success(t('login.form.login.success'))
        // const { rememberPassword } = loginConfig.value
        // const { username, password } = values
        // // 实际生产环境需要进行加密存储。
        // // The actual production environment requires encrypted storage.
        // loginConfig.value.username = rememberPassword ? username : ''
        // loginConfig.value.password = rememberPassword ? password : ''
    } catch (err) {
        msgError((err as Error).message)
    } finally {
        setLoading(false)
    }
}
</script>

<style scoped lang="scss">
.radio-group {
    margin-bottom: 30px;
}
</style>
