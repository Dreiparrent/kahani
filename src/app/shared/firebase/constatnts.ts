import {
    QuestionBase, TextboxQuestion, DropdownQuestion,
    QuestionType, NumberQuestion, ColorQuestion, TQuestionOptions, DQuestionOptions
} from './../../shared/forms/question-base';
import { DocumentReference, DocumentSnapshot, CollectionReference, QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
class FirebaseBaseClass<T> {
    protected data: T;
    public id: string;
    public ref: DocumentReference;
    protected constructor(snapData: T) {
        this.data = snapData;
    }
    protected async _setter(data: any) {
        let success = false;
        try {
            const setSuccess = await this.ref.set(data, { merge: true });
            success = true;
        } catch (error) {
            console.error(error);
            console.warn('Failed to write', Object.keys(data), Object.values(data));
        } finally {
            return success;
        }
    }
    protected _setterInside(col: CollectionReference, doc: string, data: any) {
        return col.doc(doc).set(data, { merge: true });
    }
    // protected async _getInside(ref: CollectionReference, docs?: string[]) {
    //     const setRefs = docs.map(d => ref.doc(d).get());
    //     const setData = await Promise.all(setRefs).then(data => {
    //         console.log('get');
    //         return data;
    //     });
    //     return setData;
    // }
    protected _init(ref: DocumentReference) {
        this.ref = ref;
        this.id = ref.id;
    }
}
export interface IThemeDocument {
    font: string;
    size: number;
    color: string;
    backgroundColor: string;
    weight: string;
}
interface ITheme extends IThemeDocument {
    style: { [key: string]: string };
}
export interface ICampaignDocument {
    name: string;
    link: string;
    client: DocumentReference;
    head: {
        content: string;
        type: ContentType;
    };
    subhead: {
        content: string;
        type: ContentType;
    };
    primary: IThemeDocument;
    accent: IThemeDocument;
    warn: IThemeDocument;
    background: {
        type: ContentType;
        content: string;
        poster: string;
        backgroundColor: string;
    };
    questions: IClientQuestion[];
    userQuestions: [TQuestionOptions<any> | DQuestionOptions] | any[];
    extraQuestions?: [TQuestionOptions<any> | DQuestionOptions] | any[];
}
export class CampaignBase extends FirebaseBaseClass<ICampaignDocument> {
    _name: string;
    _link: string;
    _client: DocumentReference;
    _head: {
        content: string,
        type: ContentType
    };
    _subhead: {
        content: string,
        type: ContentType
    };
    _primary: IThemeDocument;
    _accent: IThemeDocument;
    _warn: IThemeDocument;
    _background: {
        type: ContentType;
        content: string;
        poster: string;
        backgroundColor: string;
    };
    _questions: IClientQuestion[];
    _userQuestions: [TQuestionOptions<any> | DQuestionOptions] | any[];
    _extraQuestions?: [TQuestionOptions<any> | DQuestionOptions] | any[];
    _questionChosen = 0;
    questionsRef: CollectionReference;
}
export class Campaign extends CampaignBase {
    // questionChosen = 0;
    // userQuestions: QuestionBase<any>[];
    // extraQuestions?: QuestionBase<any>[] = [];

    get name() { return this._name; }
    set name(name: string) { this._setter({ name: name }).then(success => this._name = success ? name : this._name); }
    get link() { return this._link; }
    set link(link) {
        this._setter({ link: link }).then(success => this._link = success ? link : this._link);
    }
    get client() {
        return this._client;
    }
    get head() { return this._head; }
    set head(head: { content: string, type: ContentType }) {
        this._setter({ head: head }).then(success => this._head = success ? head : this._head);
    }
    get subhead() { return this._subhead; }
    set subhead(subhead: { content: string, type: ContentType }) {
        this._setter({ subhead: subhead }).then(success => this._subhead = success ? subhead : this._subhead);
    }
    get questions() { return this._questions; }
    set questions(questions: IClientQuestion[]) {
        // if (questions.length > this._questions.length) {
        //     this.ref.collection('questions').add({ question: 'question' }).then(ref => {
        //         const newQ = questions;
        //         newQ[newQ.length - 1].ref = ref;
        //         this._questions = newQ;
        //         this._setter({ questions: newQ }).then(() => this._questions = newQ);
        //     });
        // }
        if (questions.length < this._questions.length) {
            this._questions.map(q => q.ref).forEach(q => {
                if (questions.map(qq => qq.ref).indexOf(q) === -1)
                    try {
                        q.delete();
                    } catch (error) { console.warn(error); }
            });
        }
        this._setter({ questions: questions })
            .then(success => {
                if (success) {
                    this._questions = questions;
                    questions.forEach(q => {
                        q.ref.update({ question: q.text });
                    });
                }
            })
    }
    get userQuestions() {
        return (this._userQuestions as [TQuestionOptions<any> | DQuestionOptions]).map(this.questionMapper);
    }
    set userQuestions(questions) {
        const dbQuestions = questions.map(this.questionSetter);
        this._setter({ userQuestions: dbQuestions }).then(success => this._userQuestions = success ? questions : this._userQuestions);
    }
    get extraQuestions() {
        return (this._extraQuestions as [TQuestionOptions<any> | DQuestionOptions]).map(this.questionMapper);
    }
    set extraQuestions(questions) {
        const dbQuestions = questions.map(this.questionSetter);
        this._setter({ extraQuestions: dbQuestions }).then(success => this._extraQuestions = success ? questions : this._extraQuestions);
    }
    get questionChosen() { return this._questionChosen; }
    set questionChosen(question: number) {
        this._questionChosen = question;
    }
    get primary() {
        return Object.assign({ style: this.getStyle(this._primary) }, this._primary);
        // return this._primary;
    }
    set primary(primary: ITheme) {
        delete primary.style;
        this._setter({ primary: primary }).then(success => this._primary = success ? primary : this._primary);
    }
    get accent() {
        return Object.assign({style: this.getStyle(this._accent)}, this._accent);
    }
    set accent(accent: ITheme) {
        delete accent.style;
        this._setter({ accent: accent }).then(success => this._accent = success ? accent : this._accent);
    }
    get warn() {
        return Object.assign({style: this.getStyle(this._warn)}, this._warn);
    }
    set warn(warn: ITheme) {
        delete warn.style;
        this._setter({ warn: warn }).then(success => this._warn = success ? warn : this._warn);
    }
    get background() { return this._background; }
    set background(background) {
        this._setter({ background: background }).then(success => this._background = success ? background : this._background);
    }
    constructor(private snap: DocumentSnapshot<ICampaignDocument>) {
        super(snap.data());
        this._questions = [];
        this._userQuestions = [];
        this._extraQuestions = [];
        this.init();
        console.log('campaign');
    }
    private init() {
        this._init(this.snap.ref);
        this._name = this.data.name;
        this._link = this.data.link;
        this._client = this.data.client;
        this._head = this.data.head;
        this._subhead = this.data.subhead;
        this._primary = this.data.primary;
        this._accent = this.data.accent;
        this._warn = this.data.warn;
        this._background = this.data.background;
        this.questionsRef = this.ref.collection('questions');
        this._questions = this.data.questions;
        this._userQuestions = this.data.userQuestions;
        this._extraQuestions = this.data.extraQuestions;
    }

    private getStyle(theme: IThemeDocument) {
        return {
            'background-color': theme.backgroundColor,
            'color': theme.color,
            'family': theme.font,
            'size': theme.size.toString(),
            'weight': theme.weight
        };
    }

    public async addQuestion() {
        const newRef = await this.questionsRef.add({ question: 'question' });
        return newRef;
    }

    private questionMapper = (q: any): TextboxQuestion | NumberQuestion | ColorQuestion | DropdownQuestion => {
        const qq = q;
        qq.controlType = QuestionType.textbox;
        if (q.required)
            qq.required = true;
        else qq.required = false;
        switch (q.type) {
            case 'number':
                qq.controlType = QuestionType.number;
                return new ColorQuestion(qq);
            case 'dropdown':
                qq.controlType = QuestionType.dropdown;
                return new DropdownQuestion(qq);
            default:
                return new TextboxQuestion(qq);
        }
    }

    private questionSetter = (q: TextboxQuestion | NumberQuestion | ColorQuestion | DropdownQuestion):
        TQuestionOptions<any> | DQuestionOptions => {
        const baseQuestion = {
            key: q.key,
            label: q.label,
            order: q.order,
            required: q.required,
            type: q.type
        };
        if (q.options)
            Object.assign(baseQuestion, { options: q.options });
        return baseQuestion;
    }
}
export interface IClientDocument {
    name: string;
    campaigns: DocumentReference[];
    contact: {
        email: string;
        phone: string;
        website: string;
        address: string;
    };
    starred: {
        type: StarType;
        id: string // DocumentReference
    }[];
}
export class ClientBase extends FirebaseBaseClass<IClientDocument> {
    protected campaignsRef: DocumentReference[];
    _name: string;
    _contact: {
        email: string,
        phone: string,
        website: string,
        address: string
    };
    _notes: IClientNote[];
    _campaigns: Campaign[] = [];
    _starred: { type: StarType, id: string }[];
}

export class Client extends ClientBase {
    get campaigns() {
        return this._campaigns;
    }
    set campaigns(camps) {
        this._setter({ campaigns: camps.map(c => c.ref) });
    }
    starred: { type: StarType; details: IClientNote | Campaign }[] = [];
    get name() { return this._name; }
    set name(name: string) {
        this._setter({ name: name }).then(success => this.name = success ? name : this._name);
    }
    get contact() { return this._contact; }
    set contact(contact: any) {
        this._setter({ contact: contact }).then(success => this._contact = success ? contact : this._contact);
    }
    get notes() {
        return this._notes;
    }
    constructor(private snap: DocumentSnapshot<IClientDocument>) {
        super(snap.data());
        this._notes = [
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
        ];
        this.init();
    }
    private init() {
        // if (!environment.useLocal) {
            this._init(this.snap.ref);
            this._name = this.data.name;
            this._contact = this.data.contact;
            this.campaignsRef = this.data.campaigns;
        // }
    }
    public async getCampaigns() {
        const campSnap = await Promise.all(this.campaignsRef.map(c => c.get()));
        const camps = campSnap.map(c => new Campaign(c as DocumentSnapshot<ICampaignDocument>));
        this._campaigns = camps;
        return camps;
    }
    /*
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
    */
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
export interface IClientQuestion {
    text: string;
    length: number;
    order: number;
    ref: DocumentReference;
}
export interface IBaseUserData {
    email: string;
    name: string;
}
export enum ContentType { color, text, image, video }
/*
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
*/
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