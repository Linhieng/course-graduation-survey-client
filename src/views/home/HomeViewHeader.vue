<script setup lang="ts">
import { useStoreUser } from '@/stores'
import { UserFilled } from '@element-plus/icons-vue'
import IconLogo from '@icon/IconLogo.vue'
import { useRouter } from 'vue-router'

const storeUser = useStoreUser()
const router = useRouter()

const evtConfirmLogout = () => {
    storeUser.logoutUser()
    router.push({name: 'login'})
}

</script>

<template>
    <el-row class="header">
        <el-col :xs="5" :sm="8" class="header__left flex-align-center-left">
            <el-icon size="50">
                <IconLogo />
            </el-icon>
        </el-col>
        <el-col :xs="14" :sm="8" class="header__mid flex-all-center">
            <h1>问卷系统首页</h1>
        </el-col>
        <el-col :xs="5" :sm="8" class="header__right flex-align-center-right">
            <el-dropdown>
                <span>
                    <el-avatar :icon="UserFilled" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <el-popconfirm title="确定退出登录吗？" @confirm="evtConfirmLogout">
                                <template #reference>
                                    <el-button>退出登录</el-button>
                                </template>
                            </el-popconfirm>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </el-col>
    </el-row>
</template>

<style scoped lang="scss">
// @import '../../assets/style/mixin.scss';

.header {
    min-height: var(--layout-header-height);

    &__left,
    &__right {
        padding: 0 10px;

        @include width-big-800 {
            padding: 0 30px;
        }
    }

}
</style>
