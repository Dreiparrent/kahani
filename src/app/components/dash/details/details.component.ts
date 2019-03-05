import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Campaign, ContentType } from 'src/app/shared/firebase/constatnts';
import {
    QuestionBase, TextboxQuestion, DropdownQuestion,
    NumberQuestion, QuestionType, ColorQuestion
} from 'src/app/shared/forms/question-base';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-dash-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DashDetailsComponent implements OnInit {
    themes = [];
    details = [];
    detailType = Details;
    themeType = Themes;
    openAll = true;

    private _campaign: Campaign;
    @Input()
    set campaign(c: Campaign) {
        this.details[Details.Link] = [new TextboxQuestion({
            key: 'link',
            label: 'link',
            required: true,
            order: 1,
            value: c.link.content
        })];
        this.themes[Themes.Primary] = this.getColorForm(c.head.config);
        this.themes[Themes.Accent] = this.getColorForm(c.subhead.config);
        this.themes[Themes.Warn] = this.getColorForm(c.link.config);
        this.themes[Themes.Background] = [
            new DropdownQuestion({
                key: 'bg',
                label: 'Background',
                order: 1,
                required: true,
                value: c.background.type as number,
                options: [
                    {
                        key: ContentType.video, value: ContentType[ContentType.video]
                    },
                    {
                        key: ContentType.image, value: ContentType[ContentType.image]
                    },
                    {
                        key: ContentType.color, value: ContentType[ContentType.color]
                    }
                ]
            }), new ColorQuestion({
                key: 'color',
                label: 'color',
                required: true,
                value: c.background.color,
                order: 2,
            }), new TextboxQuestion({
                key: 'background content',
                label: 'Content',
                required: true,
                value: c.background.content,
                order: 3,
            })
        ];
        this.details[Details.Head] = this.getTextForm(c.head);
        this.details[Details.Subhead] = this.getTextForm(c.subhead);
        this.details[Details.Questions] = c.questions.map(q =>
        {
            return [new NumberQuestion({
                key: 'len',
                label: 'Time',
                required: true,
                order: 1,
                value: q.length
            }),
            new TextboxQuestion({
                key: 'question',
                label: 'Question',
                required: true,
                order: 2,
                value: q.text
            })
            ];
        });
        this.details[Details['User Questions']] = this.getQuestions(c.userQuestions);
        this.details[Details['Extra Questions']] = this.getQuestions(c.extraQuestions);
        this._campaign = c;
    }
    @Output() close = new EventEmitter<boolean>();
    get campaign() { return this._campaign; }
    constructor() {}

    ngOnInit() {

    }

    getColorForm(config: any) {
        return [
            new DropdownQuestion({
                key: 'font',
                label: 'Font',
                order: 1,
                required: true,
                value: 'default',
                options: [
                    {
                        key: 'default', value: 'default'
                    },
                    {
                        key: 'custom', value: 'custom'
                    }
                ]
            }),
            new ColorQuestion({
                key: 'color',
                label: 'Color',
                required: false,
                order: 2,
                value: config.color,
                dependent: {
                    key: 'font',
                    value: 'custom'
                }
            }),
            new TextboxQuestion({
                key: 'fontfamily',
                label: 'Font',
                required: false,
                order: 3,
                value: config.fontFamily,
                dependent: {
                    key: 'font',
                    value: 'custom'
                }
            }),
            new NumberQuestion({
                key: 'fontsize',
                label: 'Size',
                required: false,
                order: 4,
                value: config.fontSize,
                dependent: {
                    key: 'font',
                    value: 'custom'
                }
            }),
            new TextboxQuestion({
                key: 'fontwieght',
                label: 'Weight',
                required: false,
                order: 5,
                value: config.fontWeight,
                dependent: {
                    key: 'font',
                    value: 'custom'
                }
            })
        ];
    }

    getTextForm(sets: any) {
        console.log('type' + sets.content,sets.type);
        return [
            new DropdownQuestion({
                key: 'type',
                label: 'type',
                order: 1,
                required: true,
                value: sets.type,
                options: [
                    {
                        key: ContentType.text, value: ContentType[ContentType.text],
                    },
                    {
                        key: ContentType.image, value: ContentType[ContentType.image],
                    }
                ]
            }), new TextboxQuestion({
                key: 'content',
                label: 'Content',
                required: true,
                order: 2,
                value: sets.content
            }),
            new DropdownQuestion({
                key: 'font',
                label: 'font',
                order: 3,
                required: false,
                value: 'default',
                options: [
                    {
                        key: 'default', value: 'default'
                    },
                    {
                        key: 'custom', value: 'custom'
                    }
                ],
                dependent: {
                    key: 'type',
                    value: 'text'
                }
            }),
            new TextboxQuestion({
                key: 'fontset',
                label: 'fontset',
                required: false,
                order: 4,
                value: 'primary',
                dependent: {
                    key: 'font',
                    value: 'custom'
                }
            })
        ];
    }

    getQuestions(questions: QuestionBase<any>[]) {
        return questions.map(q => [
            new DropdownQuestion({
                key: 'req',
                label: 'Required',
                order: 1,
                required: true,
                value: 'required',
                options: [
                    {
                        key: 'required', value: 'required'
                    },
                    {
                        key: 'optional', value: 'optional'
                    }
                ]
            }),
            new DropdownQuestion({
                key: 'type',
                label: 'Type',
                order: 2,
                required: true,
                value: q.type,
                options: [
                    {
                        key: 'text', value: 'text'
                    },
                    {
                        key: 'email', value: 'email'
                    },
                    {
                        key: 'number', value: 'number'
                    },
                    {
                        key: 'dropdown', value: 'dropdown'
                    }
                ]
            }),
            new TextboxQuestion({
                key: 'question',
                label: 'Question',
                required: true,
                order: 3,
                value: q.type === QuestionType[2] ? q.label + ': ' + q.options.map(o => o.key).join(', ') : q.label
            })
        ]);
    }

    labelClick() {
        console.log('click');
    }
    drop(event: CdkDragDrop<any[]>, index: number) {
        moveItemInArray(this.details[index], event.previousIndex, event.currentIndex);
    }
    add(index: number) {
        if (index > Details.Questions)
            this.details[index].push([
                new DropdownQuestion({
                    key: 'req',
                    label: 'Required',
                    order: 1,
                    required: true,
                    value: index === Details['Extra Questions'] ? 'optional' : 'required',
                    options: [
                        {
                            key: 'required', value: 'required'
                        },
                        {
                            key: 'optional', value: 'optional'
                        }
                    ]
                }),
                new DropdownQuestion({
                    key: 'type',
                    label: 'Type',
                    order: 2,
                    required: true,
                    value: 'text',
                    options: [
                        {
                            key: 'text', value: 'text'
                        },
                        {
                            key: 'email', value: 'email'
                        },
                        {
                            key: 'number', value: 'number'
                        },
                        {
                            key: 'dropdown', value: 'dropdown'
                        }
                    ]
                }),
                new TextboxQuestion({
                    key: 'question',
                    label: 'Question',
                    required: true,
                    order: 3
                })
            ]);
        else this.details[index].push([
            new NumberQuestion({
                key: 'len',
                label: 'Time',
                required: true,
                order: 1,
                value: 60
            }),
            new TextboxQuestion({
                key: 'question',
                label: 'Question',
                required: true,
                order: 2,
            })
        ]);
    }
    remove(index: number, rem: number) {
        this.details[index].splice(rem, 1);
    }

    getStyle(index: number) {
        if (this.themes[index][1].value) {
            return { backgroundColor: this.themes[index][1].value };
        } else return;
    }
    closeDetails() {
        this.close.next(true);
    }
}
enum Details {
    'Link', 'Head', 'Subhead', 'Questions', 'User Questions', 'Extra Questions'
}
enum Themes {
    'Primary', 'Accent', 'Warn', 'Background'
}