<template>
    <a-carousel
        indicator-type="slider"
        show-arrow="hover"
        auto-play
        style="width: 100%; height: 170px; border-radius: 4px; overflow: hidden"
    >
        <a-carousel-item v-for="(src, idx) in imageSrc" :key="idx">
            <div>
                <img :src="src" style="width: 100%" />
            </div>
        </a-carousel-item>
    </a-carousel>
</template>

<script lang="ts" setup>
import login1 from '@/assets/images/login1.png';
import login2 from '@/assets/images/login2.png';
import login3 from '@/assets/images/login3.png';
import login4 from '@/assets/images/login4.png';
const imageSrc = [login1, login2, login3, login4];
</script>
