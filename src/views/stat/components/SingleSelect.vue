<script setup lang="ts">
import type { SurveyQuestion_SingleSelect } from '@/types'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useStoreStat } from '@/stores'
const storeStat = useStoreStat()

const props = defineProps<{
    question: SurveyQuestion_SingleSelect
}>()

const echartDoms = ref([])
const echartInstances = []

onMounted(() => {
    const options = storeStat.getAnswerItemOptions(props.question.questionType, props.question.order)
    options.forEach((option, i) => {
        const dom = echartDoms.value[i].querySelector('.echarts-box')
        render(dom, option)
    })
})
onBeforeUnmount(() => {
    echartInstances.forEach(echartsInstance=> {
        echartsInstance.dispose()
    })
})
async function render(dom, data) {
    const echarts = await import('echarts')
    type EChartsOption = echarts.EChartsOption
    const myChart = echarts.init(dom)
    echartInstances.push(myChart)
    let options: EChartsOption
    options = {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '回答情况',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                padAngle: 5,
                itemStyle: {
                    borderRadius: 10
                },
                label: {
                    show: true,
                    fontSize: 20,
                    position: 'top',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data
            }
        ]
    }

    options && myChart.setOption(options)

}

const showOrder = (i) => {
    const order = props.question.order
    if (props.question.questionContent.titles.length < 2) {
        return order
    } else {
        return `${order}-${i + 1}`
    }
}
</script>

<template>
    <ul>
        <li v-for="(title, i) of props.question.questionContent.titles"
            ref="echartDoms"
        >
            <p>
                {{ showOrder(i) }}
                {{ title.title }}
            </p>
            <div class="echarts-container">
                <div class="echarts-box"></div>
            </div>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.echarts-container {
    margin: auto;
    width: 80%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center
}

.echarts-box {
    width: 300px;
    height: 300px;
}
</style>
