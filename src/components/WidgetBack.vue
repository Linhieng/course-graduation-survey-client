<script setup lang="ts">
import { ref } from "vue"
import { RouterLink } from "vue-router"
import IconBack from '@/components/icons/IconBack.vue'

const props = defineProps<{
  to?: string,
  className?: string[]
}>()

const backRouter = ref(props.to || '/')
</script>

<template>
    <RouterLink :to="backRouter" class="back-link flex-all-center">
        <el-icon size="20" color="black">
            <IconBack />
        </el-icon>
    </RouterLink>
</template>

<style scoped lang="scss">

.back-link {
    width: 100%;
    height: 100%;
    &:hover {
        background-color: #eee;
    }
}

</style>
