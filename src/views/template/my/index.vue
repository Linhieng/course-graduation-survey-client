<script setup lang="ts">
import BaseContainer from '@/components/base-container/index.vue';
import SurveyList from './components/survey-list.vue';
</script>

<template>
    <base-container :items="['模版市场', '我的模版']" title="我的模版">
        <div class="wrapper">
            <SurveyList />
        </div>
    </base-container>
</template>

<style scoped lang="scss">
.container {
    padding: 0 20px 20px 20px;
}

.wrapper {
    padding: 20px 0 0 20px;
    min-height: 580px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
}
</style>
