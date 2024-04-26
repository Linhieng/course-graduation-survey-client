<template>
    <div class="container">
        <Breadcrumb :items="['模版市场', '共享模版']" />
        <div class="wrapper">
            <h1>{{ $t('共享模版') }}</h1>
        </div>
    </div>
</template>

<style scoped lang="less">
.container {
    padding: 0 20px 20px 20px;
}

.wrapper {
    padding: 20px 0 0 20px;
    min-height: 580px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
}
</style>
