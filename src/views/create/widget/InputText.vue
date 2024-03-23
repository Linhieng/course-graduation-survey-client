<script setup lang="ts">

import { ref, watchEffect } from 'vue'

export interface InputTextEmitPayload {
    title: string,
    describe: string
}

const emit = defineEmits<{
    (e: 'update', payload: InputTextEmitPayload): void,
}>()

const title = ref('')
const describe = ref('')

watchEffect(() => {
    emit('update', { title: title.value, describe: describe.value })
})

//////////////////////////////////////////////////////
// UI 相关
//////////////////////////////////////////////////////

const isHasInputDescribe = ref(false)
</script>

<template>
    <div class="input-text-wrapper">
        <div class="input-title">
            <el-input v-model="title" style="width: 100%" autosize type="textarea" placeholder="请输入问题标题" />
        </div>
        <div class="input-describe" :class="{ 'is-has-input-describe': !isHasInputDescribe }">
            <el-input v-model="describe" autosize type="textarea" :disabled="!isHasInputDescribe"
                placeholder="请输入描述信息"
                />
            <el-switch v-model="isHasInputDescribe"
                class="switch"
             />
        </div>
    </div>
</template>

<style scoped lang="scss">
.input-text-wrapper {
    margin: 4px;
}

.input-title {
    width: 100%;
    margin-bottom: 10px;
}

.input-describe {
    width: 100%;
    display: flex;
    .switch {
        margin-left: 10px;
    }
    &.is-has-input-describe {
        opacity: 0.3;
    }
}
</style>
