<script setup lang="ts">
import { getUUID } from '@/utils'
import InputRequired from './InputRequired.vue'
import InputOptional from './InputOptional.vue'

const titles = defineModel<
    Array<{
        id: string
        title: string
        describe: string
    }>
>({ required: true })

const btnAdd = (index: number) => {
    titles.value.splice(index + 1, 0, {
        id: getUUID(),
        title: '',
        describe: '',
    })
}
const btnRemove = (index: number) => {
    // 已通过 disable 标签处理
    // if (titles.value.length < 2) {
    //     msgWarning('至少需要一项')
    //     return
    // }
    titles.value.splice(index, 1)
}
</script>

<template>
    <div class="wrapper">
        <div
            v-for="(item, index) in titles"
            :key="item.id"
            class="wrapper-item"
        >
            <div class="inner-input-s">
                <InputRequired v-model="item.title" placeholder="请输入标题" />
                <InputOptional
                    v-model="item.describe"
                    placeholder="请输入描述"
                />
            </div>
            <div class="inner-btn-s">
                <el-button
                    type="primary"
                    circle
                    class="btn"
                    @click="
                        () => {
                            btnAdd(index)
                        }
                    "
                    >＋</el-button
                >
                <el-button
                    type="danger"
                    :disabled="titles.length < 2"
                    circle
                    class="btn"
                    @click="
                        () => {
                            btnRemove(index)
                        }
                    "
                    >一</el-button
                >
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
}
@keyframes show {
    from {
        box-shadow: 0 0 10px orchid;
    }
    to {
        box-shadow: none;
    }
}
.wrapper-item {
    animation: show 1000ms;

    margin-bottom: 10px;

    display: grid;
    grid-template-columns: 1fr max-content;
    grid-template-rows: 1fr;
    column-gap: 10px;

    .inner-input-s {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        row-gap: 10px;
    }

    .inner-btn-s {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
