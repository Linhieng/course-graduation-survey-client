<script setup lang="ts">
import type { OneSurvey } from '@/types'

defineProps<{
    survey: OneSurvey
}>()
</script>

<template>
    <p>{{ survey.title }}</p>
    <p>{{ survey.comment }}</p>
    <p>{{ survey.created_at }}</p>
</template>
<style scoped lang="scss"></style>
