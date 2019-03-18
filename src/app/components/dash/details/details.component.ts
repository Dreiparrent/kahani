import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Campaign, ContentType, IThemeDocument, Client } from 'src/app/shared/firebase/constatnts';
import {
    QuestionBase, TextboxQuestion, DropdownQuestion,
    NumberQuestion, QuestionType, ColorQuestion
} from 'src/app/shared/forms/question-base';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';

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
    openAll = environment.dash.openAll;
    previewColors = [
        new DropdownQuestion({
            key: 'preview',
            label: 'Preview Colors',
            order: 1,
            required: true,
            value: -1,
            options: [
                {
                    key: -1, value: 'No'
                },
                {
                    key: 1, value: 'Yes'
                },
            ]
        })
    ];

    public _campaign: Campaign;
    private _link = '';
    public get link() {
        return this._campaign.link;
    }
    public set link(link) {
        console.log(link);
        this._campaign.link = link;
    }

    @Input()
    set campaign(c: Campaign) {
        if (c) {
            this._campaign = c;
            console.log(this._campaign);
            this.details[Details.Name] = [
                new TextboxQuestion({
                    key: 'name',
                    label: 'Campaign Name',
                    required: true,
                    order: 1,
                    value: this._campaign.name
                })
            ];
            this.details[Details.Link] = [
                new TextboxQuestion({
                    key: 'link',
                    label: 'link',
                    required: true,
                    order: 1,
                    value: this._campaign.link
                })
            ];
            this.details[Details.Head] = this.getTextForm(c.head);
            this.details[Details.Subhead] = this.getTextForm(c.subhead);
            this.details.push([], [], []);
            c.questions.forEach((q, i) => this.add(Details.Questions, q.ref as any, q.length, q.text));
            c.userQuestions.forEach(q => this.add(Details['User Questions'], q.type, q.required ? 1 : -1, q.label));
            c.extraQuestions.forEach(q => this.add(Details['Extra Questions'], q.type, q.required ? 1 : -1, q.label));
            for (let i = 0; i <= CampaignThemes.background; i++) {
                this.themes[i] = this.getThemeForm(c[CampaignThemes[i]], i);
            }
        }
    }
    @Output() close = new EventEmitter<boolean>();
    get campaign() { return this._campaign; }
    constructor(private firebase: FirebaseService) {
    }

    ngOnInit() {
    }

    getTextForm(sets: { content: string, type: ContentType }) {
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
            })
        ];
    }

    getThemeForm(config: IThemeDocument | any, index: number) {
        if (index === Themes.Background)
            return [
                new DropdownQuestion({
                    key: 'type',
                    label: 'Background',
                    order: 1,
                    required: true,
                    value: config.type as number,
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
                }), new TextboxQuestion({
                    key: 'content',
                    label: 'Content',
                    required: true,
                    value: config.content,
                    order: 3,
                }), new TextboxQuestion({
                    key: 'poster',
                    label: 'Poster',
                    required: true,
                    value: config.poster ? config.poster : '',
                    order: 4,
                    dependent: {
                        key: 'type',
                        value: ContentType.video
                    }
                }),
                new ColorQuestion({
                    key: 'backgroundColor',
                    label: 'Background Color',
                    required: true,
                    value: config.backgroundColor,
                    order: 2,
                })
            ];
        return [
            new TextboxQuestion({
                key: 'font',
                label: 'Font',
                required: false,
                order: 1,
                value: config.font
            }),
            new NumberQuestion({
                key: 'size',
                label: 'Size',
                required: false,
                order: 2,
                value: config.size
            }),
            new TextboxQuestion({
                key: 'weight',
                label: 'Weight',
                required: false,
                order: 3,
                value: config.weight
            }),
            new ColorQuestion({
                key: 'backgroundColor',
                label: 'Background Color',
                required: false,
                order: 4,
                value: config.backgroundColor
            }),
            new ColorQuestion({
                key: 'color',
                label: 'Text Color',
                required: false,
                order: 5,
                value: config.color
            })
        ];
    }

    labelClick() {
        console.log('click');
    }
    add(index: number, type = 'text', required = 60, label = '') {
        if (!this.details[index])
            this.details[index] = [];
        if (index > Details.Questions)
            this.details[index].push([
                new DropdownQuestion({
                    key: 'required',
                    label: 'Required',
                    order: 1,
                    required: true,
                    value: required !== 60 ? required : index === Details['User Questions'] ? 1 : -1,
                    options: [
                        {
                            key: 1, value: 'required'
                        },
                        {
                            key: -1, value: 'optional'
                        }
                    ]
                }),
                new DropdownQuestion({
                    key: 'type',
                    label: 'Type',
                    order: 2,
                    required: true,
                    value: type,
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
                    key: 'label',
                    label: 'Question',
                    required: true,
                    value: label,
                    order: 3
                })
            ]);
        else if (type === 'text')
            this.firebase.campaign.addQuestion().then(ref => {
                this.add(Details.Questions, ref as any);
                this.changes({ label: '', type: 60, required: ref }, index, this.details.length - 1);
            });
        else {
            this.details[index].push([
                new NumberQuestion({
                    key: 'type',
                    label: 'Time',
                    required: true,
                    order: 1,
                    value: required
                }),
                new TextboxQuestion({
                    key: 'label',
                    label: 'Question',
                    required: true,
                    order: 2,
                    value: label
                }),
                new TextboxQuestion({
                    key: 'required',
                    label: 'Document Reference (do not change)',
                    required: false,
                    order: 3,
                    value: type,
                    dependent: {
                        key: 'type',
                        value: -1
                    }
                })
            ]);
        }
    }
    drop(event: CdkDragDrop<any[]>, index: number) {
        moveItemInArray(this.details[index], event.previousIndex, event.currentIndex);
        const details = this.campaign[CampaignDetails[index]][event.previousIndex];
        if (index < CampaignDetails.userQuestions) {
            this.changes({label: details.text, type: details.length.toString(), required: details.ref}, index, event.currentIndex);
        } else
            this.changes(details, index, event.currentIndex);
    }

    remove(index: number, rem: number) {
        this.details[index].splice(rem, 1);
        this.changes(false, index, rem);
    }

    getStyle(index: number) {
        if (this.previewColors[0].value === 1 && this.themes[index][3].value) {
            return { backgroundColor: this.themes[index][3].value };
        } else return;
    }
    closeDetails() {
        this.close.next(true);
    }
    changes(c: any, i: number, j = 0) {
        // this.details[i][j] = 'lin';
        // this.campaign[Details[0]] = 'lin';x
        let details = c;
        if (i === CampaignDetails.name)
            details = c.name;
        else if (i === CampaignDetails.link)
            details = c.link;
        else if (i >= CampaignDetails.questions)
            details = this.questionSetter(i, j, c);
        this.campaign[CampaignDetails[i]] = details;
        // if (i >= CampaignDetails.questions) {
        //     this.details = [];
        //     this.themes = [];
        //     this.campaign = this.firebase.campaign;
        // }
    }
    changeTheme(c: any, i: number) {
        const details = c;
        if (i < CampaignThemes.background)
            details.size = parseInt(c.size, 10);
        this.campaign[CampaignThemes[i]] = details;
    }
    private questionSetter(i: number, j: number, change?: { required: number, type: string, label: string }, set = true) {
        const update = (i < CampaignDetails.userQuestions) ? this._qmap1(i, j, change) : this._qmap2(i, j, change);
        return update;
    }
    private _qmap1(i: number, j: number, change?: { required: number | string, type: string, label: string }) {
        const update = this.details[i].map((details: [NumberQuestion, TextboxQuestion, TextboxQuestion], index: number) => {
            return {
                length: details[0].value,
                order: index + 1,
                text: details[1].value,
                ref: details[2].value,
            };
        });
        if (change) {
            this.details[i][j][0].value = change.type;
            this.details[i][j][1].value = change.label;
            this.details[i][j][2].value = change.required;
            update[j].length = parseInt(change.type, 10);
            update[j].order = j + 1;
            update[j].text = change.label;
            // if (change.required !== 'text')
            update[j].ref = change.required;
        }
        return update;
    }
    private _qmap2(i: number, j: number, change?: { required: number, type: string, label: string }) {
        const update =
            this.details[i].map((details: [DropdownQuestion, DropdownQuestion, TextboxQuestion], index: number) => {
                let detail: {
                    required: boolean,
                    key: string,
                    type: string,
                    label: string,
                    order: number,
                    options?: { key: string, value: string }[]
                } = {
                    required: details[0].value === 1 ? true : false,
                    key: index.toString(),
                    type: details[1].value as string,
                    label: details[2].value,
                    order: index + 1
                };
                detail = this._labelChecker(detail);
                return detail;
            });
        if (change) {
            this.details[i][j][0].value = change.required;
            this.details[i][j][1].value = change.type;
            this.details[i][j][2].value = change.label;
            update[j].required = change.required === 1 ? true : false;
            update[j].type = change.type;
            update[j].label = change.label;
            update[j].key = j.toString();
            update[j].order = j + 1;
            update[j] = this._labelChecker(update[j]);
        }
        return update;
    }

    private _labelChecker(details: {
        required: boolean,
        key: string,
        type: string,
        label: string,
        order: number,
        options?: { key: string, value: string }[]
    }) {
        const detail = details;
        if (details.type === 'dropdown') {
            const splits = (detail.label as string).split(':');
            if (splits.length > 1) {
                const options = splits[1].split(',');
                console.log(options);
                if (options.length > 1) {
                    detail.options = options.map((o, ii) => {
                        return {
                            key: ii.toString(),
                            value: o.trim()
                        };
                    });
                    detail.label = splits[0];
                } else details.type = 'text';
            } else details.type = 'text';
        }
        return detail;
    }

}
enum Details {
    'Name', 'Link', 'Head', 'Subhead', 'Questions', 'User Questions', 'Extra Questions'
}
enum CampaignDetails {
    name, link, head, subhead, questions, userQuestions, extraQuestions
}
enum Themes {
    'Primary', 'Accent', 'Warn', 'Background'
}
enum CampaignThemes {
    primary, accent, warn, background
}