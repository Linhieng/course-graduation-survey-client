<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { debounce, msgSuccess, noticeError, msgInfo, routerReplace, windowLocation, msgError } from '@/utils'
import { apiLogin, apiSignup } from '@/api'
import { useRouter } from 'vue-router'
import { useStoreUser } from '@/stores'
import { STATUS_SUCCEED } from '@/constants'

const storeUser = useStoreUser()
const router = useRouter()
const login_username = ref('')
const login_password = ref('')
const signup_username = ref('')
const signup_password1 = ref('')
const signup_password2 = ref('')
const formRoot = ref<HTMLElement | null>(null)

onMounted(() => {
    initListenHash()
})

/*
注册时的密码验证处理
 */

const signupPassword = debounce((e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value
    if (value.length < 4) {
        console.log('密码长度至少 4 位')
        return
    }
})
const signupPasswordAgain = debounce((e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value
    if (value !== signup_password1.value) {
        console.log('密码前后不一致')
        return
    }
})


/*
处理 登录/注册 的切换
 */

const toLogin = () => {
    formRoot.value?.classList.remove('signup')
    formRoot.value?.classList.add('login')
}
const toSignup = () => {
    formRoot.value?.classList.add('signup')
    formRoot.value?.classList.remove('login')
}
const listenHashChange = () => {
    const hash = window.location.hash.trim()
    if (hash === '#signup') {
        toSignup()
    } else {
        windowLocation('replace', '#login')
        toLogin()
    }
}
const initListenHash = () => {
    listenHashChange()
    window.addEventListener("hashchange", listenHashChange)
}



// 点击登录
const evtLogin = async () => {
    const username = login_username.value.trim()
    const password = login_password.value
    if (username === '') {
        msgInfo('请输入账号和密码')
        return
    }
    if (password === '' || password.length < 4) {
        msgInfo('密码错误（至少四位）')
        return
    }

    const resData = await apiLogin({username, password})

    console.log('获得模拟到的数据：',resData)

    if (resData.status === STATUS_SUCCEED) {
        storeUser.loginUser(resData.data)
        routerReplace(router, '/')
    } else {
        msgError('登录失败。' + resData.msg)
    }
}


// 点击注册
const evtSignup = async () => {

    if (signup_password1.value !== signup_password2.value) {
        msgInfo('密码前后不一致')
        return
    }
    const username = signup_username.value.trim()
    const password = signup_password1.value
    if (username === '') {
        msgInfo('用户名不能为空')
        return
    }
    if (password.length < 4) {
        msgInfo('密码至少四位')
        return
    }

    const resData = await apiSignup({username, password})
    if (resData.status === STATUS_SUCCEED) {
        msgSuccess('注册成功！')
        windowLocation('replace', '#login')
    } else {
        msgError('注册失败。' + resData.msg)
    }
}

</script>

<template>
    <div class="formContainer login" ref="formRoot">
        <ul class="tab-group clearfix">
            <li class="tab active">
                <a href="#signup" data-id="signup" @click.prevent="windowLocation('replace', '#signup')">注册</a>
            </li>
            <li class="tab">
                <a href="#login" data-id="login" @click.prevent="windowLocation('replace', '#login')">登录</a>
            </li>
        </ul>

        <div class="tab-content">
            <div id="signup" ref="signupEl">
                <h1>免费注册</h1>

                <form @submit.prevent="evtSignup">
                    <div class="field-wrap">
                        <input  id="signup_username" type="text" required autocomplete="off" v-model="signup_username" />
                        <label for="signup_username"> 用户名 </label>
                    </div>

                    <div class="field-wrap">
                        <input  id="signup_password" type="password" required autocomplete="off" @input="signupPassword" v-model="signup_password1" />
                        <label for="signup_password"> 密码 </label>
                    </div>
                    <div class="field-wrap">
                        <input  id="signup_password2" type="password" required autocomplete="off" @input="signupPasswordAgain" v-model="signup_password2" />
                        <label for="signup_password2"> 确认密码 </label>
                    </div>

                    <button type="submit" class="button button-block">
                        点击注册
                    </button>
                </form>
            </div>

            <div id="login" ref="loginEl">
                <h1>欢迎登录</h1>

                <form @submit.prevent="evtLogin">
                    <div class="field-wrap">
                        <input  id="login_username" type="text" required autocomplete="off" v-model="login_username" />
                        <label for="login_username"> 用户名 </label>
                    </div>

                    <div class="field-wrap">
                        <input  id="login_password" type="password" required autocomplete="off" v-model="login_password" />
                        <label for="login_password"> 密码 </label>
                    </div>

                    <p class="forgot"><a href="#">忘记密码</a></p>

                    <button type="submit" class="button button-block">
                        点击登录
                    </button>
                </form>
            </div>
        </div>
        <!-- tab-content -->
    </div>
    <!-- /formContainer -->
</template>

<style scoped lang="scss">
$form-bg: #24333c;

$main: #1ab188;
$main-light: lighten($main, 5%);
$main-dark: darken($main, 5%);

$gray-light: #a0b3b0;
$gray: #ddd;

$thin: 300;
$normal: 400;
$bold: 600;
$br: 4px;

// 切换“登录”和“注册”
.formContainer {
    #login, #signup { display: none; }
    &.login #login { display: block; }
    &.signup #signup { display: block; }

    &.login a[data-id=login],
    &.signup a[data-id=signup] {
        background: $main;
        color: white;
    }
}

.formContainer {
    background-color: rgba($form-bg, 0.9);
    padding: 40px;
    max-width: 600px;
    min-width: 300px;
    margin: 40px auto;
    border-radius: $br;
    box-shadow: 0 4px 10px 4px rgba($form-bg, 0.3);

    ul.tab-group {
        list-style: none;
        padding: 0;
        margin: 0 0 40px 0;

        li a {
            display: block;
            text-decoration: none;
            padding: 15px;
            background: rgba($gray-light, 0.25);
            color: $gray-light;
            font-size: 20px;
            float: left;
            width: 50%;
            text-align: center;
            cursor: pointer;
            transition: 500ms ease;

            &:hover {
                background: $main-dark;
                color: white;
            }
        }
    }

    .tab-content {
        h1 {
            font-size: 2rem;
            text-align: center;
            color: white;
            font-weight: $thin;
            margin: 0 0 40px;
        }

        .field-wrap {
            $p-left: 7px;
            $p-top: 10px;
            position: relative;
            margin-bottom: 40px;

            input {
                font-size: 1.2rem;
                display: block;
                width: 100%;
                height: 100%;
                padding: $p-left $p-top;
                background: none;
                background-image: none;
                border: 1px solid $gray-light;
                color: white;
                border-radius: 0;
                transition:
                    border-color 200ms ease,
                    box-shadow 200ms ease;
            }

            label {
                width: max-content;

                position: absolute;
                bottom: $p-top;
                left: auto;
                right: 10px;

                font-size: 1.2rem;
                color: rgba(white, 0.5);
                transition: color 300ms ease;
            }

            input:focus {
                outline: 0;
                border-color: $main;
            }

            input:focus+label {
                color: $main;
            }
        }

        .forgot {
            margin-top: -20px;
            text-align: right;

            a {
                text-decoration: none;
                color: $main;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        .button-block {
            display: block;
            width: 100%;
        }

        .button {
            border: 0;
            outline: none;
            border-radius: 0;
            padding: 15px 0;
            margin-top: 10px;

            color: white;
            font-size: 1.5rem;
            font-weight: $bold;

            cursor: pointer;

            background-color: $main;
            transition: background-color 500ms ease;

            &:hover,
            &:focus {
                background-color: $main-dark;
            }
            &:active {
                filter: brightness(1.1);
            }
        }
    }
}

@media (max-width: 800px) {
    .formContainer {
        width: 80vw;
    }
}
</style>
