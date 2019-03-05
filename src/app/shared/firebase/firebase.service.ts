import { environment } from 'src/environments/environment';
import { DropdownQuestion } from 'src/app/shared/forms/question-base';
import { Injectable } from '@angular/core';
import { Campaign, CampaignBase, Client, testClient } from './constatnts';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { TextboxQuestion } from 'src/app/shared/forms/question-base';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    public campaign: Campaign;
    private storgageRef: AngularFireStorageReference;
    public client: Client;
    constructor(private storage: AngularFireStorage) {
        this.campaign = new Campaign(environment.clientConfig);
        this.storgageRef = this.storage.ref('/projectxite/testVideo');
        this.client = new Client(testClient);
        this.campaign = this.client.campaigns[0];
    }

    uploadRecord(blob: Blob) { // metadata
        this.storgageRef.put(blob).then(snap => {
            console.log('uploaded', snap);
        }, error => console.log(error));
    }
}
