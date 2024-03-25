<script setup lang="ts">
import InputRequired from './InputRequired.vue'

const texts = defineModel<Array<string>>({ required: true })

const btnAdd = (index: number) => {
    texts.value.splice(index + 1, 0, '')
}
const btnRemove = (index: number) => {
    texts.value.splice(index, 1)
}

</script>

<template>
    <div class="wrapper">
        <div v-for="(item, index) in texts" :key="index"
            class="wrapper-item">
            <div class="inner-input-s">
                <InputRequired v-model="texts[index]" placeholder="请输入选项" />
            </div>
            <div class="inner-btn-s">
                <el-button type="primary" circle
                    class="btn"
                    @click="() => { btnAdd(index) }">＋</el-button>
                <el-button type="danger"
                    :disabled="texts.length < 2" circle
                    class="btn"
                    @click="() => { btnRemove(index) }">一</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper-item {
    margin-bottom: 10px;

    display: grid;
    grid-template-columns: 1fr max-content;
    grid-template-rows: 1fr;
    column-gap: 10px;

    .inner-btn-s {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
