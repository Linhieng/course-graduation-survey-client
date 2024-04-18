<script setup lang="ts">
import { ref } from 'vue'
import EditSurvey from './components/EditSurvey.vue'
import IconNext from '@icon/IconNext.vue'
import SelectSurvey from './components/SelectSurvey.vue'
import { msgError } from '@/utils'
import { useStoreSurvey } from '@/store'
const storeSurvey = useStoreSurvey()

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
    storeSurvey.setSurveyId(id)
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
            <div v-show="curStep === 1">
                <KeepAlive>
                    <SelectSurvey @create="createSurvey" />
                </KeepAlive>
            </div>
            <div v-show="curStep === 2">
                <KeepAlive>
                    <EditSurvey />
                </KeepAlive>
            </div>
            <div v-show="curStep === 3">
                <h1>发布问卷</h1>
                <p>
                    问卷一经发布，则不可重新修改问卷信息，发布前请先确认好问卷
                </p>
                <br />
                <br />
                <el-button>预览问卷</el-button>
                <br />
                <br />
                <br />
                <br />
                <el-button>发布问卷</el-button>
            </div>
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
