<script setup lang="ts">
import { useStoreStat } from '@/stores'
import AssignItem from './components/AssignItem.vue'

const storeStat = useStoreStat()
const surveyData = storeStat.getSurveyDataRef()
</script>

<template>
    <div class="warpper">
        <template v-if="surveyData">
            <p class="title">{{ surveyData.title }}</p>
            <p class="comment">{{ surveyData.comment }}</p>
            <ul>
                <li v-for="q of surveyData.questions">
                    <AssignItem :question="q" />
                </li>
            </ul>
        </template>
        <template v-else>
            <div class="loading-box">加载中……</div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.warpper {
    padding: 20px;
    .title {
        font-size: 2rem;
        margin-bottom: 10px;
    }
    .describe {
        font-size: 1.4rem;
        margin-bottom: 10px;
    }
}

.loading-box {
    font-size: 1.5rem;
}
ul {
    list-style: none;
}
</style>
