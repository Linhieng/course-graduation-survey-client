<script setup lang="ts">
const emit = defineEmits<{
    (e: 'create', id: number): void
}>()

const createOne = () => {
    // await apiNewSurvey()
    emit('create', 28)
}
</script>

<template>
    <div>
        <h1>选择问卷</h1>
        <el-button @click="createOne">创建一份普通调查问卷</el-button>
    </div>
</template>
