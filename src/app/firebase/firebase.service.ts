import { environment } from 'src/environments/environment';
import { DropdownQuestion } from './../shared/forms/question-base';
import { Injectable } from '@angular/core';
import { ClientConfig, ClientConfigBase } from './constatnts';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { TextboxQuestion } from '../shared/forms/question-base';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    public clientConfig: ClientConfig;
    private storgageRef: AngularFireStorageReference;
    constructor(private storage: AngularFireStorage) {
        this.clientConfig = new ClientConfig(environment.clientConfig);
        this.storgageRef = this.storage.ref('/projectxite/testVideo');
    }

    uploadRecord(blob: Blob) { // metadata
        this.storgageRef.put(blob).then(snap => {
            console.log('uploaded', snap);
        }, error => console.log(error));
    }
}
