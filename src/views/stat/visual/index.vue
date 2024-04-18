<script setup lang="ts">
import { useStoreStat } from '@/store'
import AssignItem from './components/AssignItem.vue'
import LoadingLine from '@/components/LoadingLine.vue'

const storeStat = useStoreStat()
storeStat.setSurveyId(28)
const surveyData = storeStat.getSurveyDataRef()
</script>

<template>
    <h1>{{ $t('view.stat.visual.title') }}</h1>
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
            <div class="loading-box">
                <LoadingLine />
                <MyLoading />
            </div>
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
