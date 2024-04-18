<template>
    <div>
        <span>{{ $t('loading') }}</span>
        <el-icon size="30"> <IconLoading /> </el-icon>
    </div>
</template>

<style scoped lang="scss">
div {
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
        margin-right: 20px;
    }
}
</style>
