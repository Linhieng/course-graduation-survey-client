import { uniqueId } from 'lodash';
import { QuestionItem, QuestionOption, QuestionType } from './types';
import { v4 as idv4 } from 'uuid';

/** TODO: 这里只设置了 tag 的背景色，没有字体颜色，某些颜色可能导致看不清 */
export const questionTypeMappingColor: {
    [key in QuestionType]: string;
} = {
    single_text: '#2196F3', // 蓝色 - 深海蓝
    multi_text: '#4CAF50', // 绿色 - 浅绿
    single_select: '#FFC107', // 黄色 - 柠檬黄
    multi_select: '#FF5722', // 橙色 - 热力橙
    pic_single_select: '#9C27B0', // 紫色 - 深紫罗兰
    pic_multi_select: '#E91E63', // 粉色 - 深粉色
    single_file: '#00BCD4', // 蓝绿色 - 深湖蓝
    multi_file: '#009688', // 青色 - 深青
    score: '#AB47BC', // 紫罗兰 - 浅紫罗兰
    NPS: '#CDDC39', // 黄绿色 - 柠檬冰茶
    matrix_single_select: '#8BC34A', // 绿色 - 深浅绿
    matrix_NPS: '#FFEB3B', // 黄色 - 淡黄色
    matrix_multi_select: '#FF9800', // 橙色 - 深橙
    matrix_scope: '#795548', // 棕色 - 石板灰
    auto_text: '#9E9E9E', // 灰色 - 中度灰色
    input_text: '#607D8B', // 靛蓝灰 - 深靛蓝灰
    auto_table: '#F44336', // 红色 - 深红色
    desc: '#000000', // 黑色 - 黑色（用于描述或其他文本）
};
export const questionTypeMappingText: {
    [key in QuestionType]: string;
} = {
    single_text: '单行文本',
    multi_text: '多行文本',
    single_select: '单选题',
    multi_select: '多选题',
    pic_single_select: '图片单选题',
    pic_multi_select: '图片多选题',
    single_file: '单文件上传',
    multi_file: '多文件上传',
    score: '评分题',
    NPS: '量表题',
    matrix_single_select: '矩阵单选',
    matrix_multi_select: '矩阵多选',
    matrix_NPS: '矩阵量表',
    matrix_scope: '矩阵评分',
    auto_text: '自增文本',
    input_text: '填充题',
    auto_table: '自增表格',
    desc: '非填空的文本描述',
};
export function getAllQuestionTemplate(): QuestionItem[] {
    const qs: QuestionItem[] = [];
    for (const t of Object.keys(questionTypeMappingText)) {
        // TODO 为什么这里会报错呢？
        // @ts-ignore
        qs.push(getNewQuestion(t));
    }
    qs.forEach((q, i) => (q.order = i));
    return qs;
}
export function getNormalQuestion(): QuestionItem[] {
    const qs: QuestionItem[] = [];
    qs.push(getNewQuestion('single_text'));
    qs.push(getNewQuestion('multi_text'));
    qs.push(getNewQuestion('single_select'));
    qs.push(getNewQuestion('multi_select'));
    qs.forEach((q, i) => (q.order = i));
    return qs;
}

/** 生成一个问题的对象 */
export function getNewQuestion(type: QuestionType): QuestionItem {
    const q: QuestionItem = {
        type,
        id: idv4(),
        order: 0,
        title: '未定义标题',
        required: true,

        desc: '',
        options: [
            {
                id: idv4(),
                text: '选项',
                url: '',
                index: 0,
            },
        ],
        titles: [{ id: uniqueId(), text: '未定义问题标题' }],
    };

    return q;
}

export function getNewOption(type: QuestionType): QuestionOption {
    return {
        id: idv4(),
        text: '选项',
        url: '',
        index: -1,
    };
}
