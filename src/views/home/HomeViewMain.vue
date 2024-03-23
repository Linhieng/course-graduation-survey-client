<script setup lang="ts">

import { apiGetAllSurveys } from '@/api';
import { STATUS_SUCCEED } from '@/constants'
import { onMounted, ref } from 'vue'

const surveys = ref()

onMounted(async () => {
    const resData = await apiGetAllSurveys()
    if (resData.status === STATUS_SUCCEED) {
        surveys.value = resData.data.all_surveys
    }
})

</script>

<template>
    <div class="surveys-container">
        <div v-for="survey of surveys" class="surveys-item">
            <p>{{ survey.title }}</p>
            <p>{{ survey.time }}</p>
            <p>{{ survey.status }}</p>
            <div class="options">
                <el-button text>修改问卷内容</el-button>
                <el-button text>{{ survey.status === '收集中' ? '停止' : '发布' }}</el-button>
                <el-button text>移入回收站</el-button>
                <el-button text>统计数据</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.surveys-container {
    margin: 10px;
    display: flex;
    flex-wrap: wrap;

    .surveys-item {
        border: 1px solid #eee;
        margin: 10px;
    }

}
</style>
