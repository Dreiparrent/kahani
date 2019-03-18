import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgModule } from '@angular/core';

import { FirebaseService } from './firebase.service';
import { Campaign } from './constatnts';

const mockFireStorage: Partial<AngularFireStorage> = {

};

export const mockFirebase: Partial<FirebaseService> = {
    uploadRecord: (blob: Blob) => {
        return Promise.resolve(true);
    },
    // campaign: new Campaign(environment.campaignConfig),
};
export const mockAngularFireStorage = {
    ref: () =>  ''
};