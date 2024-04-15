<script setup lang="ts">
import { ref } from 'vue'
import { useStoreAnswer } from '@/store'
import QuestionAssign from './QuestionAssign.vue'

const props = defineProps<{
    id: string
}>()
const storeAnswer = useStoreAnswer()
const surveyData = storeAnswer.getSurveyDataRef()
const isFetching = ref(true)

storeAnswer.setSurveyId(props.id)

storeAnswer.fetchSurvey(() => {
    isFetching.value = false
})

const submit = () => {
    storeAnswer.submitAnswer()
}
</script>

<template>
    <div class="wrapper">
        <div class="loading flex-all-center" v-if="isFetching">
            <el-skeleton animated> </el-skeleton>
            <el-skeleton animated> </el-skeleton>
            <el-skeleton animated> </el-skeleton>
            <el-skeleton animated> </el-skeleton>
            <el-skeleton animated> </el-skeleton>
        </div>
        <div v-else class="survey-wrapper">
            <header>
                <h1>{{ surveyData?.title }}</h1>
                <p>{{ surveyData?.comment }}</p>
            </header>
            <main>
                <ol>
                    <li
                        v-for="question of surveyData?.questions"
                        :key="question.id"
                        :class="{ required: question.isRequired }"
                    >
                        <QuestionAssign :question="question" />
                    </li>
                </ol>
                <div class="btn-submit-wrap">
                    <el-button class="btn-submit" type="primary" @click="submit"
                        >提交</el-button
                    >
                </div>
            </main>
            <footer>
                <ul>
                    <li>Copyright © Linhieng</li>
                </ul>
            </footer>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    min-height: 100vh;
    padding: 20px;
    background-color: #f2f3f5;
}
.loading {
    padding: 30px;
    flex-direction: column;
}
.survey-wrapper {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 20px #eee;
}
header {
    h1 {
        font-size: 2rem;
        text-align: center;
        font-weight: bold;
        margin-bottom: 20px;
    }
    p {
        text-indent: 2rem;
    }
    padding-bottom: 30px;
    border-bottom: 1px solid gainsboro;
}

main {
    margin-top: 30px;
    padding: 20px;
    ol {
        list-style: none;
    }
    li {
        margin-bottom: 30px;
    }
    .btn-submit-wrap {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 60px;
        padding: 30px;
        .btn-submit {
            width: 100%;
            height: 100%;
            font-size: 1.5rem;
        }
    }
}

footer {
    margin-top: 30px;
    padding: 10px 20px;
    ul {
        list-style: none;
        li {
            display: flex;
            align-items: center;
            justify-content: end;
        }
    }
}
</style>
