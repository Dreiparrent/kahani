import { QuestionBase, TextboxQuestion, DropdownQuestion } from './../shared/forms/question-base';
export class ClientConfig implements ClientConfigBase {
    name: string;
    head: IClientText;
    subhead: IClientText;
    link: IClientText;
    hasImg: boolean;
    hasVideo: boolean;
    questions: IClientQuestion[];
    userQuestions: QuestionBase<any>[];
    extraQuestions: QuestionBase<any>[];
    constructor(public config: ClientConfigBase) {
        this.name = config.name;
        this.head = config.head;
        this.subhead = config.subhead;
        this.link = config.link;
        this.hasImg = config.hasImg;
        this.hasVideo = config.hasVideo;
        this.questions = config.questions;
        this.userQuestions = config.userQuestions;
        if (config.extraQuestions)
            this.extraQuestions = config.extraQuestions;
        this.config.head.style = this.getStyle(this.config.head.config);
        this.config.subhead.style = this.getStyle(this.config.subhead.config);
    }
    private getStyle = (sets: ITextStyle): string => {
        let baseStyle = '';
        if (sets.fontSize)
            baseStyle += `fontsize: ${sets.fontSize}`;
        if (sets.fontName)
            baseStyle += `fontFamily: ${sets.fontName}`;
        return baseStyle;
    }
}
export interface ClientConfigBase {
    name: string;
    head: IClientText;
    subhead: IClientText;
    link: IClientText;
    hasImg: boolean;
    hasVideo: boolean;
    questions: IClientQuestion[];
    userQuestions: QuestionBase<any>[];
    extraQuestions?: QuestionBase<any>[];
}
interface IClientText {
    hasImg?: boolean;
    config: ITextStyle;
    content: string;
    style: string;
}
interface ITextStyle {
    fontName?: string;
    fontSize: number;
}
interface IClientQuestion {
    text: string;
    length: number;
}
export interface IBaseUserData {
    email: string;
    name: string;
}


export const testConfig: ClientConfigBase = {
    name: 'Project X-ITE',
    head: {
        hasImg: true,
        content: '/assets/Project-X-ITE.png',
        config: {
            fontName: 'Calibri',
            fontSize: 24
        },
        style: ''
    },
    subhead: {
        hasImg: false,
        content: 'YOU HAVE GREAT STORIES. AND WE WANT TO HEAR THEM.',
        config: {
            fontName: 'Calibri',
            fontSize: 21
        },
        style: ''
    },
    link: {
        content: '',
        config: {
            fontName: 'Calibri',
            fontSize: 24
        },
        style: ''
    },
    hasImg: true,
    hasVideo: true,
    questions: [{ text: 'Question 1', length: 60 }, { text: 'Question 2', length: 60 }, { text: 'Question 3', length: 60 }],
    userQuestions: [
        new TextboxQuestion({
            key: 'name',
            label: 'Name',
            required: true,
            order: 1
        }),
        new TextboxQuestion({
            key: 'email',
            label: 'email',
            required: true,
            order: 2,
            type: 'email'
        })
    ],
    extraQuestions: [
        new DropdownQuestion({
            key: 'extra',
            label: 'extra',
            order: 3,
            required: false,
            options: [
                {
                    key: 'o1', value: 'o1'
                },
                {
                    key: 'o2', value: '02'
                }
            ]
        })
    ]
};