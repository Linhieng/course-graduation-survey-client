<script setup lang="ts">
import { useStoreSurvey } from '@/stores'
import { saveFile, readFileContent, msgError, msgSuccess } from '@/utils'

const sotreSurvey = useStoreSurvey()

const exportSurvey = () => {
    sotreSurvey.exportSurvey()
}

const importSurvey = async (event: Event) => {
    // TODO: 添加加载动画
    try {
        const target = event.target as any
        if (!target) return
        if (target.files.length < 0) return
        const content = await readFileContent(target.files[0])
        const survey = JSON.parse(content)
        sotreSurvey.importSurvey(survey)
    } catch (error) {
        msgError('读取文件失败')
    }

}
</script>

<template>
    <h2>通用工具</h2>
    <ul>
        <!-- <li> <el-button>批量编辑顺序</el-button> </li> -->
        <li> <el-button @click="exportSurvey">导出问卷模版</el-button> </li>
        <li class="input-file"> <el-button>导入问卷模版</el-button>
            <input type="file" accept=".json" @input="importSurvey">
        </li>
    </ul>
</template>

<style scoped lang="scss">
h2 {
    margin: 10px;
}

ul>li {
    padding: 10px;
}

// 隐藏文件输入框，让其等于父元素大小
.input-file {
    position: relative;

    >input[type=file] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }
}
</style>
