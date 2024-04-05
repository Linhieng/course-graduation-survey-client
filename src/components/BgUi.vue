<!-- <script setup lang="ts">

</script> -->

<template>
    <!-- adapted from: https://codepen.io/rafaelavlucas/pen/NWWQNjZ -->
    <div class="wrapper">
        <div class="container">
            <div id="scene" class="scene" data-hover-only="false">
                <div class="circle" data-depth="1.2"></div>

                <div class="one" data-depth="0.9">
                    <div class="content">
                        <span class="piece"></span>
                        <span class="piece"></span>
                        <span class="piece"></span>
                    </div>
                </div>

                <div class="two" data-depth="0.60">
                    <div class="content">
                        <span class="piece"></span>
                        <span class="piece"></span>
                        <span class="piece"></span>
                    </div>
                </div>

                <div class="three" data-depth="0.40">
                    <div class="content">
                        <span class="piece"></span>
                        <span class="piece"></span>
                        <span class="piece"></span>
                    </div>
                </div>
            </div>

            <div class="slot">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$m-01: #fb8a8a;
$m-02: #ffedc0;

$bg-root: #695681;
$bg-02: #36184f;
$bg-03: #32243e;

$g-01: linear-gradient(90deg, #ffedc0 0%, #ff9d87 100%);
$g-02: linear-gradient(90deg, #8077ea 13.7%, #eb73ff 94.65%);

$circleShadow:
    inset 5px 20px 40px rgba($bg-02, 0.25),
    inset 5px 0px 5px rgba($bg-03, 0.3),
    inset 5px 5px 20px rgba($bg-03, 0.25),
    2px 2px 5px rgba(white, 0.2);

.wrapper {
    min-width: 300px;
    min-height: 500px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    background-color: $bg-root;

    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;

    .container {
        margin: 0 auto;
        transition: all 0.4s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        // Scene for the Parallax Effect
        .scene {
            position: absolute;
            width: 100vw;
            height: 100vh;
            vertical-align: middle;
        }

        // All elements' containers
        .one,
        .two,
        .three,
        .circle {
            width: 60%;
            height: 60%;
            top: 20% !important;
            left: 20% !important;
            min-width: 400px;
            min-height: 400px;

            .content {
                width: 600px;
                height: 600px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: content 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;

                @keyframes content {
                    0% {
                        width: 0;
                    }
                }

                .piece {
                    width: 200px;
                    height: 80px;
                    display: flex;
                    position: absolute;
                    border-radius: 80px;
                    z-index: 1;

                    animation: pieceLeft 8s cubic-bezier(1, 0.06, 0.25, 1)
                        infinite both;

                    @keyframes pieceLeft {
                        0% {
                        }

                        50% {
                            left: 80%;
                            width: 10%;
                        }

                        100% {
                        }
                    }

                    @keyframes pieceRight {
                        0% {
                        }

                        50% {
                            right: 80%;
                            width: 10%;
                        }

                        100% {
                        }
                    }
                }
            }
        }

        // Bigger Circle
        .circle {
            position: absolute;

            &:before {
                content: '';
                position: absolute;
                width: 800px;
                height: 800px;
                background-color: rgba($bg-02, 0.2);
                border-radius: 100%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                box-shadow: $circleShadow;
                animation: circle 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;

                @keyframes circle {
                    0% {
                        width: 0;
                        height: 0;
                    }
                }
            }
        }

        // Container 1
        .one {
            .content {
                // Smaller Circle
                &:before {
                    content: '';
                    position: absolute;
                    width: 600px;
                    height: 600px;
                    background-color: rgba($bg-02, 0.3);
                    border-radius: 100%;
                    box-shadow: $circleShadow;
                    animation: circle 0.8s 0.4s cubic-bezier(1, 0.06, 0.25, 1)
                        backwards;
                }

                .piece {
                    background: $g-02;

                    &:nth-child(1) {
                        right: 15%;
                        top: 18%;
                        height: 30px;
                        width: 120px;
                        animation-delay: 0.5s;
                        animation-name: pieceRight;
                    }

                    &:nth-child(2) {
                        left: 15%;
                        top: 45%;
                        width: 150px;
                        height: 50px;
                        animation-delay: 1s;
                        animation-name: pieceLeft;
                    }

                    &:nth-child(3) {
                        left: 10%;
                        top: 75%;
                        height: 20px;
                        width: 70px;
                        animation-delay: 1.5s;
                        animation-name: pieceLeft;
                    }
                }
            }
        }

        // Container 2
        .two {
            .content {
                .piece {
                    background: $g-01;

                    &:nth-child(1) {
                        left: 0%;
                        top: 25%;
                        height: 40px;
                        width: 120px;
                        animation-delay: 2s;
                        animation-name: pieceLeft;
                    }

                    &:nth-child(2) {
                        right: 15%;
                        top: 35%;
                        width: 180px;
                        height: 50px;
                        animation-delay: 2.5s;
                        animation-name: pieceRight;
                    }

                    &:nth-child(3) {
                        right: 10%;
                        top: 80%;
                        height: 20px;
                        width: 160px;
                        animation-delay: 3s;
                        animation-name: pieceRight;
                    }
                }
            }
        }

        // Container 3
        .three {
            .content {
                .piece {
                    background: $m-01;

                    &:nth-child(1) {
                        left: 25%;
                        top: 35%;
                        height: 20px;
                        width: 80px;
                        animation-name: pieceLeft;
                        animation-delay: 3.5s;
                    }

                    &:nth-child(2) {
                        right: 10%;
                        top: 55%;
                        width: 140px;
                        height: 40px;
                        animation-name: pieceRight;
                        animation-delay: 4s;
                    }

                    &:nth-child(3) {
                        left: 40%;
                        top: 68%;
                        height: 20px;
                        width: 80px;
                        animation-name: pieceLeft;
                        animation-delay: 4.5s;
                    }
                }
            }
        }
    }
}

.wrapper .slot {
    width: 100vw;
    height: 100vh;
    animation: text 400ms 1s ease backwards;
    z-index: 2;

    @keyframes text {
        0% {
            opacity: 0;
            transform: translateY(100%);
        }
    }
}
</style>
