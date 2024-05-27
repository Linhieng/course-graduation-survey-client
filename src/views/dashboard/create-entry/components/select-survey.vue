<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const emit = defineEmits<{
    (e: 'next'): void;
}>();
</script>

<template>
    <a-space direction="vertical" fill size="large">
        <p>{{ $t('从已有问卷中选择：') }}</p>
        <a-space style="padding-left: 30px">
            <a-button
                @click="
                    () => {
                        router.push({ name: 'my-draft-survey' });
                    }
                "
            >
                {{ $t('从草稿箱中选择问卷') }}
            </a-button>
            <a-button @click="() => router.push({ name: 'template-my' })">{{ $t('从模版市场中选择问卷') }}</a-button>
        </a-space>
        <p>{{ $t('制作一份全新问卷：') }}</p>
        <a-space style="padding-left: 30px">
            <a-button type="primary" @click="() => emit('next')">{{ $t('新建一份问卷') }}</a-button>
        </a-space>
    </a-space>
</template>
