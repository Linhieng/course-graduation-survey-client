<template>
    <el-radio-group v-model="login_register" class="radio-group">
        <el-radio-button value="login">{{
            $t('login.form.login')
        }}</el-radio-button>
        <el-radio-button value="register">{{
            $t('login.form.register')
        }}</el-radio-button>
    </el-radio-group>
    <KeepAlive>
        <component :is="formComp" />
    </KeepAlive>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

const login_register = ref('login')

const formComp = computed(() => {
    if (login_register.value === 'login') {
        return LoginForm
    } else {
        return RegisterForm
    }
})
</script>

<style scoped lang="scss">
.radio-group {
    margin-bottom: 30px;
}
</style>
