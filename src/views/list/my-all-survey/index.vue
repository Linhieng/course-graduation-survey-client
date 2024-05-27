<script setup lang="ts">
import DataTable from './components/data-table.vue';
import SearchTable from './components/search-table.vue';
</script>
<template>
    <div class="container">
        <Breadcrumb :items="['我的问卷', '所有问卷']" />
        <div class="box">
            <SearchTable />
            <DataTable />
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    padding: 0 20px 20px 20px;

    .box {
        padding: 20px;
        border-radius: 8px;
        background-color: var(--color-bg-2);
    }
}
</style>
