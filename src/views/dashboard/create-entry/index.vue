<template>
    <div class="container">
        <Breadcrumb :items="['工作台', '新建问卷']" />
        <a-card class="general-card">
            <template #title>
                {{ $t('新建问卷') }}
            </template>
            <div class="wrapper">
                <a-steps
                    :direction="width > 800 ? 'horizontal' : 'vertical'"
                    v-model:current="step"
                    line-less
                    class="steps"
                >
                    <a-step :description="$t('可以新建全新问卷，也可以从草稿箱中选择问卷')">
                        {{ $t('选择一份问卷') }}
                    </a-step>
                    <a-step :description="$t('添加基本的问卷标题和问卷描述')">
                        {{ $t('添加问卷的基本信息') }}
                    </a-step>
                    <a-step :description="$t('开始创建问卷，然后添加问题')">
                        {{ $t('创建问卷') }}
                    </a-step>
                </a-steps>
                <keep-alive>
                    <SelectSurvey BaseInfo v-if="step === 1" @next="() => (step = 2)" />
                    <SurveyBase v-else-if="step === 2" @next="() => (step = 3)" @back="step = 1" />
                    <SurveyCreate v-else-if="step === 3" @back="step = 2" />
                </keep-alive>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import SelectSurvey from './components/select-survey.vue';
import SurveyBase from './components/survey-base.vue';
import SurveyCreate from './components/survey-create.vue';
import { useWindowSize } from '@vueuse/core';
import { useCreateStore } from '@/store';
const { width } = useWindowSize();
const step = ref(1);
const createStore = useCreateStore();

/**
 * TODO: 由于数据都放在 store 里面了，所以导致很多页面中的数据都是旧数据
 * 不仅仅这里，其他地方肯定也有这个问题，但目前先放着了
 */
onBeforeMount(() => {
    createStore.$state.survey.title = '未定义的问卷标题';
    createStore.$state.survey.comment = '';
    createStore.$state.survey.survey_type = 0;
    createStore.$state.survey.is_template = 0;
});
</script>

<script lang="ts">
export default {
    name: 'Step',
};
</script>

<style scoped lang="less">
.container {
    padding: 0 20px 20px 20px;
}
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    background-color: var(--color-bg-2);
    :deep(.arco-form) {
        .arco-form-item {
            &:last-child {
                margin-top: 20px;
            }
        }
    }
}

.steps {
    margin-bottom: 76px;
    width: 840px;
    @media screen and (max-width: 800px) {
        width: 340px;
    }
}
</style>
