<script setup lang="ts">
import useLocale from '@/hooks/locale'
const { currentLocale, changeLocale } = useLocale()
</script>

<template>
    <div class="header">
        <h1>{{ $t('login.form.title') }}</h1>
        <div class="locale-container">
            <ul class="locale-list" :class="currentLocale">
                <li @click="changeLocale('zh-CN')" data-locale="zh-CN">
                    <span>中文</span>
                </li>
                <li @click="changeLocale('en-US')" data-locale="en-US">
                    <span>English</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.locale-list {
    display: flex;
    list-style: none;
    li {
        width: max-content;
        padding: 10px;
        margin-right: 4px;
        cursor: pointer;
    }
    &.zh-CN li[data-locale='zh-CN'],
    &.en-US li[data-locale='en-US'] {
        color: white;
        background-color: #409eff;
    }
}

.header {
    margin: auto;
    margin-bottom: 40px;

    .locale-container {
        float: right;
    }
}
</style>
