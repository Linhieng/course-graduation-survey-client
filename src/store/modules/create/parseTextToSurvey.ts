import { uniqueId } from 'lodash';
import type { QuestionItem } from './types';

/**
 * 解析文本为 survey 格式
 * @param text string
 * @returns
 */
export function parseTextToSurvey(text: string): QuestionItem[] {
    const questionsStr = text.split(/^---\r?\n|\n---\r?\n/);
    const questions: QuestionItem[] = [];
    if (questionsStr[0] === '') {
        questionsStr.shift();
    }
    questionsStr.forEach((oneQuestionStr) => {
        questions.push(getQuestion(oneQuestionStr));
    });

    questions.forEach((q, i) => {
        q.order = i;
    });

    return questions;
}

function getQuestion(oneQuestionStr: string): QuestionItem {
    const questionType = oneQuestionStr.slice(0, oneQuestionStr.indexOf('\n'));
    const oneQuestionStrNotType = oneQuestionStr.slice(oneQuestionStr.indexOf('\n'));

    if (questionType === '单行文本题') {
        return {
            ...singleText(oneQuestionStrNotType),
            type: 'single_text',
        };
    } else if (questionType === '多行文本题') {
        return {
            ...multiText(oneQuestionStrNotType),
            type: 'multi_text',
        };
    } else if (questionType === '单选题') {
        return {
            ...singleSelect(oneQuestionStrNotType),
            type: 'single_select',
        };
    } else if (questionType === '多选题') {
        return {
            ...multiSelect(oneQuestionStrNotType),
            type: 'multi_select',
        };
    }
    throw new Error(`格式错误，识别到未知的问题类型：${questionType}`);
}

function singleText(oneQuestionStrNotType: string): QuestionItem {
    const items = oneQuestionStrNotType.split(/^- |\n- |\n-\n/);
    if (items[0] === '') {
        items.shift();
    }

    if (items.length < 2) {
        throw new Error('每个问题必须有一个标题和描述，即使为空也要保留');
    }

    const questionItem: QuestionItem = {
        type: 'single_text',
        title: items[0],
        desc: items[1],
        id: uniqueId(),
        order: -1,
        options: [],
        required: true, // 先写死。
        titles: [],
    };
    return questionItem;
}
const multiText = (oneQuestionStrNotType: string): QuestionItem => {
    const q = singleText(oneQuestionStrNotType);
    q.type = 'multi_text';
    return q;
};

function singleSelect(oneQuestionStrNotType: string): QuestionItem {
    const items = oneQuestionStrNotType.split(/^- |\n- |\n-\n/);
    if (items[0] === '') {
        items.shift();
    }

    if (items.length < 2) {
        throw new Error('每个问题必须有一个标题和描述，即使为空也要保留');
    }
    if (items.length < 3) {
        throw new Error('至少要有一个选项');
    }

    const q: QuestionItem = {
        title: items[0],
        desc: items[1],
        options: items.slice(2).map((text, index) => {
            return { id: uniqueId(), index, text, url: '' };
        }),
        type: 'single_select',
        id: uniqueId(),
        order: 0,
        required: true, // 写死
        titles: [],
    };
    return q;
}
const multiSelect = (oneQuestionStrNotType: string): QuestionItem => {
    const q = singleSelect(oneQuestionStrNotType);
    q.type = 'multi_select';
    return q;
};

const test1 = `---
单行文本题
- 这里是标题
- 这里是描述，为空时也不能省略
---
多行文本题
- 这里是标题
标题可以换行
- 这里是描述，为空时也不能省略
---
单选题
- 这里是标题
- 这里是描述
- 这是选项1
- 这里选项2
- 。。。
---
多选题
- 这里是标题
- 这里是描述
- 这是选项1
- 这里选项2
- 。。。
`;
const test2 = `
---
单行文本题
- 这里是标题
- 这里是描述，为空时也不能省略
描述可以换行
- 多余的内容会被忽略
---
多行文本题
- 这里是标题
标题可以换行
- 这里是描述，为空时也不能省略
---
单选题
- 这里是标题
- 这里是描述
- 这是选项1
- 这里选项2
- 。。。
---
多选题
- 这里是标题
- 这里是描述
- 这是选项1
- 这里选项2
- 。。。
`;
const a = parseTextToSurvey(test1);
const b = parseTextToSurvey(test2);
console.log(a, b);
