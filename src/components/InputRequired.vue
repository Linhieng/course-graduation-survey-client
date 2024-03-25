<script setup lang="ts">
const props = defineProps({
    placeholder: {
        type: String,
        default: '请输入'
    }
})
const title = defineModel({ required: true })
</script>

<template>
    <el-input v-model="title" style="width: 100%" autosize type="textarea"
        :placeholder="props.placeholder" />
</template>

<style scoped lang="scss">
</style>
