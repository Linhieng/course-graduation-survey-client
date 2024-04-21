import { QuestionItem, QuestionOption, QuestionType } from './types';
import { v4 as idv4 } from 'uuid';

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
