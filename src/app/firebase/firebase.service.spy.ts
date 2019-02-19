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
    testClientConfig: new ClientConfig(testConfig),
};
export const mockAngularFireStorage = {
    ref: () =>  ''
};