<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    placeholder: {
        type: String,
        default: '请输入'
    }
})
const describe = defineModel({ required: true })


//////////////////////////////////////////////////////
// UI 相关
//////////////////////////////////////////////////////

const isHasInputDescribe = ref(false)
</script>

<template>
    <div class="wrapper" :class="{ 'hide': !isHasInputDescribe }">
        <el-input v-model="describe" autosize type="textarea" :disabled="!isHasInputDescribe"
            :placeholder="props.placeholder" />
        <el-switch v-model="isHasInputDescribe"
            class="switch" />
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    display: flex;

    .switch {
        margin-left: 10px;
    }

    &.hide {
        opacity: 0.3;
    }
}
</style>
