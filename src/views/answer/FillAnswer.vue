<script setup lang="ts">
import { ref } from 'vue'
import { useStoreAnswer } from '@/stores';
const props = defineProps<{
    id: string
}>()
const storeAnswer = useStoreAnswer()
const isFetching = ref(true)

storeAnswer.setSurveyId(props.id)

storeAnswer.fetchSurvey(() => {
    isFetching.value = false
})
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
                <h1>{{ storeAnswer.surveyData?.title }}</h1>
                <p>{{ storeAnswer.surveyData?.comment }}</p>
            </header>
            <main>

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

    background-color: floralwhite;
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
