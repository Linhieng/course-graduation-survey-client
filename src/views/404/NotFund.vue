<script setup lang="ts">
import BgUi from '@/components/BgUi.vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const msg = route.query.msg || '恭喜你发现了新大陆'
</script>

<template>
    <BgUi>
        <article>
            <p class="p404">404</p>
            <p class="info">{{ msg }}</p>
            <RouterLink to="/">
                <button class="button">创建问卷</button>
            </RouterLink>
        </article>
    </BgUi>
</template>

<style scoped lang="scss">
$m-01: #fb8a8a;
$m-02: #ffedc0;

$bg-root: #695681;
$bg-02: #36184f;
$bg-03: #32243e;

article {
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

// The 404 Number
.p404 {
    font-size: 10rem;
    font-weight: bold;
    letter-spacing: 4px;
    color: white;

    animation: anime404 0.6s cubic-bezier(0.3, 0.8, 1, 1.05) both;
    animation-delay: 1.2s;

    @keyframes anime404 {
        0% {
            opacity: 0;
            transform: scale(10) skew(20deg, 20deg);
        }
    }
}

.info {
    color: white;
    font-size: 2rem;
    letter-spacing: 0.6px;
    margin-bottom: 40px;
    text-shadow: 6px 6px 10px $bg-03;
}

.button {
    cursor: pointer;

    width: 50vw;
    max-width: 200px;
    height: 70px;
    border-radius: 50px;

    box-shadow: 0px 15px 20px rgba($bg-02, 0.5);
    font-size: 1.4em;
    color: white;
    background: $m-01;

    outline: none;
    border: none;

    &:hover {
        box-shadow: 0px 10px 10px -10px rgba($bg-02, 0.5);
        filter: brightness(1.01);
        outline: none;
    }
}

.info,
.button {
    animation: flow 0.6s cubic-bezier(0.3, 0.8, 1, 1.05) both;
    animation-delay: 2s;

    @keyframes flow {
        0% {
            opacity: 0;
            transform: translateY(100%);
        }
    }
}
</style>
