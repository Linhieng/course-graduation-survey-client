// @ts-nocheck
import { describe, expect, test } from 'vitest'
import { fillObject, resetObject, unrefRecursion } from '../common'
import { isRef, ref } from 'vue'

describe('测试 unrefRecursion', () => {
    test('单层对象解套 ref', () => {
        const obj = {
            a: 1,
            b: ref(2),
            c: ref(3)
        }
        const newObj = unrefRecursion(obj)
        expect(isRef(newObj.a)).toBeFalsy()
        expect(isRef(newObj.b)).toBeFalsy()
        expect(isRef(newObj.c)).toBeFalsy()
    })
    test('直接解套 ref', () => {
        const obj = ref({
            id: 1,
            title: ref('title'),
            questions: ref([
                {
                    title: ref('title')
                },
                {
                    title: ref('title')
                }
            ])
        })
        const newObj = unrefRecursion(obj)
        expect(isRef(newObj)).toBeFalsy()
        expect(isRef(newObj.title)).toBeFalsy()
        expect(isRef(newObj.questions)).toBeFalsy()
        expect(isRef(newObj.questions[0].title)).toBeFalsy()
        expect(isRef(newObj.questions[1].title)).toBeFalsy()
    })
    test('多层对象解套 ref', () => {
        const obj = {
            id: 1,
            title: ref('title'),
            questions: ref([
                {
                    title: ref('title')
                },
                {
                    title: ref('title')
                }
            ])
        }
        const newObj = unrefRecursion(obj)
        expect(isRef(newObj.title)).toBeFalsy()
        expect(isRef(newObj.questions)).toBeFalsy()
        expect(isRef(newObj.questions[0].title)).toBeFalsy()
        expect(isRef(newObj.questions[1].title)).toBeFalsy()
    })
})

describe('测试 fillObject', () => {
    test('target 中应该包含 fillData 中的数据', () => {
        const target = {}
        const fillData = {
            id: '123',
            username: '123',
            token: '123',
            avatar: '123',
        }
        fillObject(target, fillData)
        expect(target).toMatchObject(fillData)
    })

    test('target 中应该只包含 template 中定义的 key, 并且 value 值等于 fillData 中的数据', () => {
        const target = {}
        const template = {
            id: '', username: '', token: ''
        }
        const fillData = {
            id: '123',
            username: '123',
            token: '123',
            avatar: '123',
        }
        const expectTarget = {
            id: '123',
            username: '123',
            token: '123',
        }
        fillObject(target, template, fillData)
        expect(target).toMatchObject(expectTarget)
        expect(target).not.toHaveProperty('avatar')
    })
})

describe('测试 resetObject', () => {
    test('期待 target 中的值全为空字符串', () => {
        const target = {
            a: 1, b: 2, c: 3
        }
        resetObject(target, target, '')

        Object.values(target).forEach(value => {
            expect(value).toBe('')
        })
    })
    test('期待 target 中的值全为空字符串，但 d 属性的值为 0 ', () => {
        const target = {
            a: 1, b: 2, c: 3, d: 4
        }
        resetObject(target, target, '', { d: 0 })

        Object.entries(target).forEach(([key, value]) => {
            if (key === 'd') {
                expect(value).toBe(0)
            } else {
                expect(value).toBe('')
            }
        })
    })
    test('期待 target 中，对应 template 的值全为空字符串，但 d 属性的值为 0, 其他值保持不变', () => {
        const target = {
            name: '123',
            email: '123',
            address: '123',
            d: '123',
            age: 30,
        }

        // 假设模板是一个对象，表示对应的键对应的值应该是空字符串
        const template = {
            name: '',
            email: '',
            address: '',
            d: '',
        }

        resetObject(target, template, '', { d: 0 })

        Object.keys(template).forEach((key) => {
            if (key === 'd') {
                // 对 d 属性进行特殊检查，确保其值为 0
                expect(target[key]).toBe(0)
            } else {
                expect(target[key]).toBe('')
            }
        })
        // 其他属性的值应该保持不变
        expect(target.age).toBe(30)
    })
})
