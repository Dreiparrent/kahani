import { AngularFireStorage } from '@angular/fire/storage';
import { NgModule } from '@angular/core';

import { testConfig, FirebaseService } from './firebase.service';
import { ClientConfig } from './constatnts';

const mockFireStorage: Partial<AngularFireStorage> = {

};

export const mockFirebase: Partial<FirebaseService> = {
    uploadRecord: (blob: Blob) => {
        return;
    },
    testClientConfig: new ClientConfig(testConfig.name, testConfig.head,
        testConfig.subhead, testConfig.link, testConfig.hasImg, testConfig.hasVideo, testConfig.questions),
};
export const mockAngularFireStorage = {
    ref: () =>  ''
};