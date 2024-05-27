<script setup lang="ts">
defineProps<{
    items: string[];
    title: string;
}>();
</script>

<template>
    <div class="container">
        <Breadcrumb :items="items" />
        <a-row :gutter="20" align="stretch">
            <a-col :span="24">
                <a-card class="general-card" :title="$t(title)">
                    <slot />
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<style scoped lang="scss">
.container {
    padding: 0 20px 20px 20px;
}
</style>
