<template>
    <div class="container">
        <div class="content">
            <header class="header">
                <div class="header-text">{{ $t('问卷系统') }}</div>
                <div class="toggle-language">
                    <a-radio-group
                        :default-value="currentLocale"
                        @change="(v) => changeLocale(v as 'zh-CN' | 'en-US')"
                        type="button"
                        size="mini"
                    >
                        <a-radio value="zh-CN">中文</a-radio>
                        <a-radio value="en-US">English</a-radio>
                    </a-radio-group>
                </div>
            </header>
            <div class="content-inner">
                <LoginForm />
            </div>
            <div class="footer">
                <Footer />
            </div>
        </div>
        <LoginBanner />
    </div>
</template>

<script lang="ts" setup>
import Footer from '@/components/footer/index.vue';
import LoginBanner from './components/banner.vue';
import LoginForm from './components/login-form.vue';
import useLocale from '@/hooks/locale';

const { changeLocale, currentLocale } = useLocale();
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    height: 100vh;

    .banner {
        width: 550px;
        background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
    }

    .content {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        padding-bottom: 40px;
        background: linear-gradient(to bottom, #aadeee, white);
    }

    .footer {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
    }
}

.header {
    position: absolute;
    top: 12px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 0 24px;

    &-text {
        color: black;
        font-size: 20px;
    }
}
</style>

<style lang="scss" scoped>
@import '@/assets/style/breakpoint.scss';

// responsive
@media (max-width: $screen-lg) {
    .container {
        .banner {
            width: 25%;
        }
    }
}
</style>
