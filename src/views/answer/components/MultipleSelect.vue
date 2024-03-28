<script setup lang="ts">
import type { SurveyQuestion_MultiSelect } from '@/types'
import { ref } from 'vue'

const props = defineProps<{
    question: SurveyQuestion_MultiSelect
}>()
const titles = props.question.questionContent.titles
const options = props.question.questionContent.options

const answerMultiple = ref([])
</script>

<template>
    <div class="wrap" v-for="(title, index) of titles"
        :key="title.id">
        <p>{{ title.title }}</p>
        <p>{{ title.describe }}</p>
        <div>
            <el-checkbox-group v-model="answerMultiple" size="large"
                class="checkbox-group">
                <el-checkbox v-for="(option, index) of options"
                    border
                    class="checkbox-item"
                    :key="index"
                    :label="option"
                    :value="option" />
            </el-checkbox-group>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrap {
    margin-bottom: 40px;
    p {
        margin-bottom: 20px;
    }

    p:nth-child(1) {
        font-size: large;
    }

    .checkbox-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    .checkbox-item {
        margin: 10px;
    }
}
</style>
