import { DropdownQuestion } from './../shared/forms/question-base';
import { Injectable } from '@angular/core';
import { ClientConfig, ClientConfigBase } from './constatnts';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { TextboxQuestion } from '../shared/forms/question-base';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    public testClientConfig: ClientConfig;
    private storgageRef: AngularFireStorageReference;
    constructor(private storage: AngularFireStorage) {
        this.testClientConfig = new ClientConfig(testConfig);
        this.storgageRef = this.storage.ref('/projectxite/testVideo');
    }

    uploadRecord(blob: Blob) { // metadata
        this.storgageRef.put(blob).then(snap => {
            console.log('uploaded', snap);
        }, error => console.log(error));
    }
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