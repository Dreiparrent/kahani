import { QuestionBase } from './../shared/forms/question-base';
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