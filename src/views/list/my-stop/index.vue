<script setup lang="ts">
import SurveyStop from './survey-stop.vue';
</script>
<template>
    <div class="container">
        <Breadcrumb :items="['我的问卷', '所有问卷']" />
        <div class="cover">
            <survey-stop />
        </div>
    </div>
</template>
<style scoped>
.cover {
    background-color: var(--color-bg-2);
    padding: 10px 30px 30px 30px;
}
</style>
