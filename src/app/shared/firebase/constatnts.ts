import {
    QuestionBase, TextboxQuestion, DropdownQuestion,
    QuestionType, NumberQuestion, ColorQuestion, TQuestionOptions, DQuestionOptions
} from './../../shared/forms/question-base';
export class CampaignBase {
    id: string;
    name: string;
    head: IClientText;
    subhead: IClientText;
    link: IClientText;
    background: {
        type: ContentType;
        content: string;
        poster?: string;
        color?: string;
    };
    questions: IClientQuestion[];
    userQuestions: [TQuestionOptions<any> | DQuestionOptions] | any[];
    extraQuestions?: [TQuestionOptions<any> | DQuestionOptions] | any[];
}
export class Campaign extends CampaignBase {
    userQuestions: QuestionBase<any>[];
    extraQuestions?: QuestionBase<any>[] = [];
    constructor(public config: CampaignBase) {
        super();
        this.id = config.id;
        this.name = config.name;
        this.head = config.head;
        this.subhead = config.subhead;
        this.link = config.link;
        this.questions = config.questions;
        this.userQuestions = (config.userQuestions as [TQuestionOptions<any> | DQuestionOptions]).map(this.questionMapper);
        this.background = config.background;
        if (config.extraQuestions)
            this.extraQuestions = (config.extraQuestions as [TQuestionOptions<any> | DQuestionOptions]).map(this.questionMapper);
        this.config.head.style = this.getStyle(this.config.head.config);
        this.config.subhead.style = this.getStyle(this.config.subhead.config);
    }
    private getStyle = (sets: ITextStyle): string => {
        let baseStyle = '';
        if (sets.fontSize)
            baseStyle += `fontsize: ${sets.fontSize};`;
        if (sets.fontFamily)
            baseStyle += `fontFamily: ${sets.fontFamily};`;
        if (sets.fontWeight)
            baseStyle += `fontWeight: ${sets.fontWeight};`;
        if (sets.color)
            baseStyle += `color: ${sets.color};`;
        return baseStyle;
    }
    private questionMapper = (q: any) => {
        switch (q.controlType) {
            case QuestionType.textbox:
                return new TextboxQuestion(q);
            case QuestionType.number:
                return new NumberQuestion(q);
            case QuestionType.color:
                return new ColorQuestion(q);
            case QuestionType.dropdown:
                return new DropdownQuestion(q);
        }
    }
}

export class ClientBase {
    name: string;
    contact: {
        email?: string,
        phone?: string,
        website?: string,
        [key: string]: string
    };
    notes: IClientNote[];
    _campaigns: CampaignBase[];
    _starred: {type: StarType, id: string}[];
}

export class Client extends ClientBase {
    campaigns: Campaign[];
    starred: { type: StarType; details: IClientNote | Campaign}[];
    constructor(public config: ClientBase) {
        super();
        this.name = config.name;
        this.contact = config.contact;
        this.notes = config.notes;
        this.campaigns = this.config._campaigns.map(c => {
            return new Campaign(c);
        });
        this.starred = config._starred.map(s => {
            if (s.type === StarType.campaign)
                return {
                    type: StarType.campaign,
                    details: this.campaigns.find(c => c.id === s.id)
                };
            else
                return {
                    types: StarType.note,
                    details: this.notes.find(n => n.id === s.id)
                };
            // else return;
        }) as any;
    }
}

interface IClientText {
    type: ContentType;
    config: ITextStyle;
    content: string;
    style: string;
}
interface ITextStyle {
    fontFamily?: string;
    fontWeight?: string;
    color?: string;
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
export enum ContentType { color, text, image, video }

export const testConfig: CampaignBase = {
    id: '1',
    name: 'Project X-ITE',
    head: {
        type: ContentType.image,
        content: '/assets/Project-X-ITE.png',
        config: {
            fontFamily: 'Calibri',
            fontSize: 24,
            color: '#673ab7'
        },
        style: ''
    },
    subhead: {
        type: ContentType.text,
        content: 'YOU HAVE GREAT STORIES. AND WE WANT TO HEAR THEM.',
        config: {
            fontFamily: 'Calibri',
            color: '#ff4081',
            fontSize: 21
        },
        style: ''
    },
    link: {
        type: ContentType.text,
        content: '',
        config: {
            fontFamily: 'Calibri',
            fontSize: 24,
            color: '#f44336'
        },
        style: ''
    },
    background: {
        type: ContentType.video,
        content: '/assets/GC.mp4',
        poster: '/assets/GC.png',
        color: '#000000bb'
    },
    questions: [{ text: 'Question 1', length: 60 }, { text: 'Question 2', length: 60 }, { text: 'Question 3', length: 60 }],
    userQuestions: [
        {
            controlType: QuestionType.textbox,
            key: 'name',
            label: 'Name',
            required: true,
            order: 1
        },
        {
            controlType: QuestionType.textbox,
            key: 'email',
            label: 'email',
            required: true,
            order: 2,
            type: 'email'
        }
    ],
    extraQuestions: [
        {
            controlType: QuestionType.dropdown,
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
        }
    ]
};

export const testClient: ClientBase = {
    name: 'Test Client',
    contact: {
        email: 'cleint@email.com',
        phone: '1231231234',
        website: 'www.site.com',
        address: ''
    },
    notes: [
        {
            id: '2',
            name: 'Test Note',
            details: [
                {
                    note: 'note 1',
                    level: 0
                },
                {
                    note: 'note 2',
                    level: 1
                },
                {
                    note: 'note 3',
                    level: 2
                },
            ]
        }
    ],
    _campaigns: [
        testConfig
    ],
    _starred: [
        {
            type: 1,
            id: '2'
        }
    ]
};

export interface IClientNote {
    id: string;
    name: string;
    details: {
        note: string;
        level: NoteLevel;
    }[];
}
export enum NoteLevel {
    h, p, ul1, ul2, ul3, ol1, ol2, ol3
}
export enum StarType { campaign, note }