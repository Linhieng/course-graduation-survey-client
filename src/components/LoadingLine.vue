<script setup lang="ts"></script>

<template>
    <!-- https://codepen.io/gsound/pen/yVPVGQ -->
    <div class="container">
        <div class="wrap hr-animation">
            <hr class="colored" />
            <hr class="colored" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@keyframes hr-animation {
    from {
        transform: translate(0, 0);
    }
    to {
        transform: translate(50%, 0);
    }
}

.hr-animation {
    animation: hr-animation 1s infinite;
}

.colored {
    background-image: -webkit-gradient(
        radial,
        50% 50%,
        0,
        50% 50%,
        350,
        from(#0076ff),
        to(white)
    );
}

.container {
    overflow: hidden;
    width: 100%;
    transition: all 0.5s;
    height: 3px;
}

.container:hover {
    height: 0;
}

.wrap {
    font-size: 0;
    height: 100%;
    width: 200%;
    position: relative;
}

.wrap hr {
    border: none;
    height: 100%;
    width: 50%;
    position: absolute;
}

.wrap hr:last-child {
    left: -50%;
}
</style>
