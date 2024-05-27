<template>
    <div class="container">
        <Breadcrumb :items="['个人中心', '用户信息']" />
        <UserInfoHeader />
        <div class="content">
            <div class="content-left">
                <a-grid :cols="24" :col-gap="16" :row-gap="16">
                    <a-grid-item :span="24">
                        <LatestActivity />
                    </a-grid-item>
                </a-grid>
            </div>
            <div class="content-right">
                <a-grid :cols="24" :row-gap="16">
                    <a-grid-item class="panel" :span="24">
                        <LatestNotification />
                    </a-grid-item>
                </a-grid>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'user-info',
});
import UserInfoHeader from './components/user-info-header.vue';
import LatestNotification from './components/latest-notification.vue';
import LatestActivity from './components/latest-activity.vue';
</script>

<style scoped lang="scss">
.container {
    padding: 0 20px 20px 20px;
}

.content {
    display: flex;
    margin-top: 12px;

    &-left {
        flex: 1;
        margin-right: 16px;
        overflow: hidden;
        // background-color: var(--color-bg-2);

        :deep(.arco-tabs-nav-tab) {
            margin-left: 16px;
        }
    }

    &-right {
        width: 332px;
    }

    .tab-pane-wrapper {
        padding: 0 16px 16px 16px;
    }
}
</style>

<style lang="scss" scoped>
.mobile {
    .content {
        display: block;
        &-left {
            margin-right: 0;
            margin-bottom: 16px;
        }
        &-right {
            width: 100%;
        }
    }
}
</style>
