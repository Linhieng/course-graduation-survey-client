<script setup lang="ts">
import WidgetBack from '@/components/WidgetBack.vue'
import { useStoreSurvey } from '@/stores'
import { onBeforeUnmount } from 'vue'

const storeSurvey = useStoreSurvey()
const cacheTime = storeSurvey.getCacheTimeRef()

// 每 3 秒缓存一次
const timer = setInterval(() => {
    storeSurvey.cacheSurvey()
}, 1000 * 3)
onBeforeUnmount(() => {
    clearInterval(timer)
})

</script>

<template>
    <ul class="wrapper">
        <li>
            <WidgetBack class="flex-align-center-left" />
        </li>
        <li>
            <p> 创建问卷 </p>
        </li>
        <li>
            <p>{{ cacheTime ?
                `最近缓存：${cacheTime}` :
                '未缓存' }}
            </p>
        </li>
    </ul>
</template>

<style scoped lang="scss">
@mixin w1 {
    @media screen and (min-width: 600px) {
        @content;
    }
}
ul {
    list-style: none;
}

.wrapper {
    height: 100%;

    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto auto auto;

    li {
        min-width: max-content;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    li:nth-child(1) {
        min-width: 30px;
    }
    @include w1{
        li:nth-child(1) {
            width: 100px;
        }
    }
}
</style>
