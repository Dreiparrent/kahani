import { Injectable } from '@angular/core';
import { ClientConfig, ClientConfigBasse } from './constatnts';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    public testClientConfig: ClientConfig;
    private storgageRef: AngularFireStorageReference;
    constructor(private storage: AngularFireStorage) {
        this.testClientConfig = new ClientConfig(testConfig.name, testConfig.head,
            testConfig.subhead, testConfig.link, testConfig.hasImg, testConfig.hasVideo, testConfig.questions);
        this.storgageRef = this.storage.ref('/projectxite/testVideo');
    }

    uploadRecord(blob: Blob) { // metadata
        this.storgageRef.put(blob).then(snap => {
            console.log('uploaded', snap);
        }, error => console.log(error));
    }
}
export const testConfig: ClientConfigBasse = {
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
    questions: [{ text: 'Question 1', length: 60 }, { text: 'Question 2', length: 60 }, { text: 'Question 3', length: 60 }]
};