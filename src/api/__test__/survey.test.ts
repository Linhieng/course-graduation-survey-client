// @ts-nocheck
import { expect, test } from 'vitest'
import { apiNewSurvey, apiGetAllSurveys } from '../survey'

test('测试创建一个新问卷', async () => {
    const resData = await apiNewSurvey()
    expect(typeof resData.data.surveyId).toBe('number')
})

test('测试获取所有问卷', async () => {
    const resData = await apiGetAllSurveys()
    expect(resData.data.all_surveys).instanceOf(Array)
})
