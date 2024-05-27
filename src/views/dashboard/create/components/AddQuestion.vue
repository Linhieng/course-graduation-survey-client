<script setup lang="ts">
import { ref } from 'vue';
import { useCreateStore } from '@/store';
import type { QuestionType } from '@/store/modules/create/types';
const createStore = useCreateStore();
const props = defineProps<{
    order: number;
}>();

const visibleDrawer = ref(false);

const createQuestion = (evt: MouseEvent) => {
    const target = evt.target as HTMLElement;
    if (target.dataset.type) {
        createStore.addQuestion(props.order, target.dataset.type as QuestionType);
        if (createStore.config.autoCloseAddPanel) {
            visibleDrawer.value = false;
        }
    }
};
</script>

<template>
    <a-button class="btn" @click="visibleDrawer = true">
        <template #icon>
            <icon-font name="add" />
        </template>
        <template #default>
            {{ $t('在第 ') + (order + 1) + $t('个问题后面添加') }}
        </template>
    </a-button>
    <a-drawer
        :width="340"
        :visible="visibleDrawer"
        :footer="false"
        :hide-cancel="false"
        @ok="visibleDrawer = false"
        @cancel="visibleDrawer = false"
    >
        <template #title>{{ $t('请选择问题类型') }}</template>
        <div class="content" @click="createQuestion">
            <a-space direction="vertical">
                <p>{{ $t('常见问题类型') }}</p>
                <a-space wrap>
                    <a-button data-type="single_text">{{ $t('单行文本') }}</a-button>
                    <a-button data-type="multi_text">{{ $t('多行文本') }}</a-button>
                    <a-button data-type="single_select">{{ $t('单选题') }}</a-button>
                    <a-button data-type="multi_select">{{ $t('多选题') }}</a-button>
                    <a-button disabled data-type="score">{{ $t('评分题') }}</a-button>
                    <a-button disabled data-type="NPS">{{ $t('量表题') }}</a-button>
                </a-space>
            </a-space>
            <a-space direction="vertical">
                <p>{{ $t('文件相关类型') }}</p>
                <a-space wrap>
                    <a-button disabled data-type="pic_single_select">{{ $t('图片单选题') }}</a-button>
                    <a-button disabled data-type="pic_multi_select">{{ $t('图片多选题') }}</a-button>
                    <a-button disabled data-type="single_file">{{ $t('单文件上传') }}</a-button>
                    <a-button disabled data-type="multi_file">{{ $t('多文件上传') }}</a-button>
                </a-space>
            </a-space>
            <a-space direction="vertical">
                <p>{{ $t('矩阵类型') }}</p>
                <a-space wrap>
                    <a-button data-type="matrix_single_select">{{ $t('矩阵单选') }}</a-button>
                    <a-button data-type="matrix_multi_select">{{ $t('矩阵多选') }}</a-button>
                    <a-button disabled data-type="matrix_NPS">{{ $t('矩阵量表') }}</a-button>
                    <a-button disabled data-type="matrix_scope">{{ $t('矩阵评分') }}</a-button>
                </a-space>
            </a-space>
            <a-space direction="vertical">
                <p>{{ $t('其他类型') }}</p>
                <a-space wrap>
                    <a-button disabled data-type="auto_text">{{ $t('自增文本') }}</a-button>
                    <a-button disabled data-type="input_text">{{ $t('填充题') }}</a-button>
                    <a-button disabled data-type="auto_table">{{ $t('自增表格') }}</a-button>
                </a-space>
            </a-space>
            <a-space direction="vertical">
                <p>{{ $t('非问题') }}</p>
                <a-space wrap>
                    <a-button data-type="desc">{{ $t('文本描述') }}</a-button>
                </a-space>
            </a-space>
        </div>
    </a-drawer>
</template>

<style scoped lang="less">
.btn {
    color: black;
}
</style>
