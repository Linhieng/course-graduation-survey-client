<script setup lang="ts">
import { ref } from 'vue'
import CreateViewMain from './CreateViewMain.vue'
import IconNext from '@icon/IconNext.vue'
import SelectSurvey from './components/SelectSurvey.vue'
import { msgError } from '@/utils'

const curStep = ref(1)
const curSurveyId = ref()

const clickTo = (nextStep: number) => {
    if (nextStep > 1 && !curSurveyId.value) {
        msgError('view.survey.create.placeCreateFirst')
        return
    }

    curStep.value = nextStep
}

const createSurvey = (id: number) => {
    curSurveyId.value = id
    clickTo(2)
}
</script>

<template>
    <div class="container">
        <!-- TODO: 封装成组件 -->
        <ul class="steps">
            <li :class="{ active: curStep === 1 }">
                <button text @click="() => clickTo(1)">选择问卷</button>
            </li>
            <el-icon :size="30">
                <IconNext />
            </el-icon>
            <li :class="{ active: curStep === 2 }">
                <button text @click="() => clickTo(2)">编辑问卷</button>
            </li>
            <el-icon :size="30">
                <IconNext />
            </el-icon>
            <li :class="{ active: curStep === 3 }">
                <button text @click="() => clickTo(3)">发布问卷</button>
            </li>
        </ul>
        <div class="content">
            <template v-if="curStep === 1">
                <SelectSurvey @create="createSurvey" />
            </template>
            <template v-else-if="curStep === 2">
                <CreateViewMain :id="curSurveyId" />
            </template>
            <template v-else-if="curStep === 3">
                <h1>发布问卷</h1>
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
ul {
    list-style: none;
}
.container {
    width: 100%;
}
.steps {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .active {
        background-color: skyblue;
        color: white;
    }
    li button {
        cursor: pointer;
        width: max-content;
        padding: 10px;
        color: inherit;
        background-color: transparent;
        border: none;
        outline: none;
        &:active {
            outline: none;
        }
    }
}
</style>
