<script setup lang="ts">
import { useCollectStore } from '@/store';
</script>

<template>
    <h2>
        {{ $t('问卷标题：') }}
    </h2>
    <p>
        {{ $t('问卷描述：') }}
    </p>
</template>
