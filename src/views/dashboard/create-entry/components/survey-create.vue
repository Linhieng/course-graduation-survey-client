<script setup lang="ts">
import { useCreateStore } from '@/store';
import { useRouter } from 'vue-router';
const router = useRouter();
const createStore = useCreateStore();
const emit = defineEmits<{
    (e: 'back'): void;
}>();

const createSurvey = () => {
    createStore.cacheSurvey();
    router.push({
        name: 'Create',
    });
};
</script>

<template>
    <p style="font-size: 1.5rem">请确认你的问卷信息没有填写错误：</p>
    <a-space direction="vertical" fill size="large" class="wrap">
        <a-form :model="{}" :style="{ width: '800px' }">
            <a-form-item field="title" tooltip="一份问卷的标题，推荐简短一点，最好在 10 字以内" label="输入问卷标题">
                <a-textarea
                    auto-size
                    disabled
                    style="width: 100%"
                    v-model="createStore.$state.survey.title"
                ></a-textarea>
            </a-form-item>
            <a-form-item
                field="comment"
                tooltip="问卷的基本描述，对整份问卷进行概括，字数不宜过多"
                label="输入问卷描述"
            >
                <a-textarea
                    auto-size
                    disabled
                    style="width: 100%"
                    v-model="createStore.$state.survey.comment"
                ></a-textarea>
            </a-form-item>
            <a-form-item field="type" tooltip="对问卷进行分类，方便统计" label="输入问卷类型" disabled>
                <a-radio-group v-model="createStore.$state.survey.surveyType">
                    <a-radio :value="0">
                        <template #radio="{ checked }">
                            <a-space
                                align="start"
                                class="custom-radio-card"
                                :class="{ 'custom-radio-card-checked': checked }"
                            >
                                <div className="custom-radio-card-mask">
                                    <div className="custom-radio-card-mask-dot" />
                                </div>
                                <div>
                                    <div className="custom-radio-card-title">常规问卷</div>
                                    <a-typography-text type="secondary">
                                        不知道选择哪种类型时，就选择常规问卷
                                    </a-typography-text>
                                </div>
                            </a-space>
                        </template>
                    </a-radio>
                    <a-radio :value="1">
                        <template #radio="{ checked }">
                            <a-space
                                align="start"
                                class="custom-radio-card"
                                :class="{ 'custom-radio-card-checked': checked }"
                            >
                                <div className="custom-radio-card-mask">
                                    <div className="custom-radio-card-mask-dot" />
                                </div>
                                <div>
                                    <div className="custom-radio-card-title">调研问卷</div>
                                    <a-typography-text type="secondary">
                                        用于统计相关产品、或者其他的数据
                                    </a-typography-text>
                                </div>
                            </a-space>
                        </template>
                    </a-radio>
                    <a-radio :value="2">
                        <template #radio="{ checked }">
                            <a-space
                                align="start"
                                class="custom-radio-card"
                                :class="{ 'custom-radio-card-checked': checked }"
                            >
                                <div className="custom-radio-card-mask">
                                    <div className="custom-radio-card-mask-dot" />
                                </div>
                                <div>
                                    <div className="custom-radio-card-title">心理问卷</div>
                                    <a-typography-text type="secondary">心理健康调研问卷</a-typography-text>
                                </div>
                            </a-space>
                        </template>
                    </a-radio>
                </a-radio-group>
            </a-form-item>
            <a-space size="large" class="btn-group">
                <a-button @click="emit('back')">{{ $t('返回修改') }}</a-button>
                <a-button type="primary" @click="createSurvey">{{ $t('确认创建问卷') }}</a-button>
            </a-space>
        </a-form>
    </a-space>
</template>

<style scoped lang="less">
.wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.btn-group {
    display: flex;
    justify-content: end;
}

.custom-radio-card {
    padding: 10px 16px;
    border: 1px solid var(--color-border-2);
    border-radius: 4px;
    width: 250px;
    box-sizing: border-box;
    margin: 10px;
}

.custom-radio-card-mask {
    height: 14px;
    width: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 1px solid var(--color-border-2);
    box-sizing: border-box;
}

.custom-radio-card-mask-dot {
    width: 8px;
    height: 8px;
    border-radius: 100%;
}

.custom-radio-card-title {
    color: var(--color-text-1);
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
}

.custom-radio-card:hover,
.custom-radio-card-checked,
.custom-radio-card:hover .custom-radio-card-mask,
.custom-radio-card-checked .custom-radio-card-mask {
    border-color: rgb(var(--primary-6));
}

.custom-radio-card-checked {
    background-color: var(--color-primary-light-1);
}

.custom-radio-card:hover .custom-radio-card-title,
.custom-radio-card-checked .custom-radio-card-title {
    color: rgb(var(--primary-6));
}

.custom-radio-card-checked .custom-radio-card-mask-dot {
    background-color: rgb(var(--primary-6));
}

:deep(textarea.arco-textarea) {
    -webkit-text-fill-color: black;
}
</style>