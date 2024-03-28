<script setup lang="ts">
import type { SurveyQuestion_SingleSelect } from '@/types'
import { ref } from 'vue'

const props = defineProps<{
    question: SurveyQuestion_SingleSelect
}>()
const titles = props.question.questionContent.titles
const options = props.question.questionContent.options

const answerSingle = ref([])
</script>

<template>
    <div class="wrap" v-for="(title, index) of titles"
        :key="title.id">
        <p>{{ title.title }}</p>
        <p>{{ title.describe }}</p>
        <div>
            <el-radio-group v-model="answerSingle[index]" size="large"
                class="radio-group">
                <el-radio v-for="(option, index) of options"
                    class="radio"
                    border
                    :key="index"
                    :label="option"
                    :value="option" />
            </el-radio-group>
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

    .radio-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
    .radio {
        margin: 0;
    }
}
</style>
