<script setup lang="ts">
import { ref, computed } from 'vue'
import EditSurvey from './components/EditSurvey.vue'
import IconNext from '@icon/IconNext.vue'
import IconNextDown from '@icon/IconNextDown.vue'
import SelectSurvey from './components/SelectSurvey.vue'
import { msgError } from '@/utils'
import { useSurveyStore } from '@/store'
import { useWindowSize } from '@vueuse/core'
const storeSurvey = useSurveyStore()
const { width } = useWindowSize()

const curStep = computed(() => storeSurvey.getCurEditSurveyStep)
const curSurveyId = computed(() => storeSurvey.getCurEditSurveyId)

const clickTo = (nextStep: 1 | 2 | 3) => {
    storeSurvey.createGotoNext(nextStep)
}
</script>

<template>
    <div class="container">
        <!-- TODO: 封装成组件 -->
        <ul class="steps">
            <li :class="{ active: curStep === 1 }">
                <button text @click="() => clickTo(1)">
                    {{ $t('view.survey.create.step.select') }}
                </button>
            </li>
            <el-icon :size="30">
                <template v-if="width >= 600">
                    <IconNext />
                </template>
                <template v-else>
                    <IconNextDown />
                </template>
            </el-icon>
            <li :class="{ active: curStep === 2 }">
                <button text @click="() => clickTo(2)">
                    {{ $t('view.survey.create.step.edit') }}
                </button>
            </li>
            <el-icon :size="30">
                <template v-if="width >= 600">
                    <IconNext />
                </template>
                <template v-else>
                    <IconNextDown />
                </template>
            </el-icon>
            <li :class="{ active: curStep === 3 }">
                <button text @click="() => clickTo(3)">
                    {{ $t('view.survey.create.step.publish') }}
                </button>
            </li>
        </ul>
        <div class="content">
            <div v-show="curStep === 1">
                <KeepAlive>
                    <SelectSurvey />
                </KeepAlive>
            </div>
            <div v-show="curStep === 2">
                <KeepAlive>
                    <EditSurvey />
                </KeepAlive>
            </div>
            <div v-show="curStep === 3">
                <h1>
                    {{ $t('view.survey.create.step.publish') }}
                </h1>
                <p>
                    {{ $t('view.survey.create.publish-attention-info') }}
                </p>
                <br />
                <br />
                <el-button>{{ $t('view.survey.create.preview') }}</el-button>
                <br />
                <br />
                <br />
                <br />
                <el-button>{{
                    $t('view.survey.create.step.publish')
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@mixin wl600 {
    @media screen and (max-width: 600px) {
        @content;
    }
}

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
    // 添加这一项，在手机端会导致左侧缩了一部分，导致看不到内容
    // justify-content: space-evenly;

    @include wl600 {
        flex-direction: column;
    }

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
