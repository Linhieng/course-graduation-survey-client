<script setup lang="ts">

import { ref } from 'vue'

const title = ref('')
const describe = ref('')

//////////////////////////////////////////////////////
// UI 相关
//////////////////////////////////////////////////////

const isHasInputDescribe = ref(false)
</script>

<template>
    <div class="input-title">
        <el-input v-model="title" style="width: 100%" autosize type="textarea" placeholder="请输入问题标题" />
    </div>
    <div class="input-describe" :class="{ 'is-has-input-describe': !isHasInputDescribe }">
        <el-input v-model="describe" autosize type="textarea" :disabled="!isHasInputDescribe" placeholder="请输入描述信息，如无请留空" />
        <el-switch v-model="isHasInputDescribe" />
    </div>
</template>

<style scoped lang="scss">
.input-title {
    width: 100%;
    margin: 20px 0;
}

.input-describe {
    width: 100%;
    margin: 20px 0;
    display: flex;

    >*:nth-of-type(1) {
        padding-right: 20px;
    }

    &.is-has-input-describe {
        opacity: 0.3;
    }
}
</style>
