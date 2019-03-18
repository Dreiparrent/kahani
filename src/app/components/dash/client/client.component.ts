import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { Client, Campaign, IClientNote, StarType, ContentType } from 'src/app/shared/firebase/constatnts';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector: 'app-campaign',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
    @Output() details = new EventEmitter<Campaign>();
    public client = new BehaviorSubject<Client>(null);
    public campaigns = new Subject<Campaign[]>();
    public contact = new Subject<string[]>();
    // public get campaigns() { return this.client.campaigns; }
    public notes = new Subject<IClientNote[]>();
    public starred: { type: StarType; details: IClientNote | Campaign }[];
    public contentType = ContentType;
    public note1: ['1'];
    public note2: ['2'];
    public note3: ['3'];
    // public get starred() { return this.client.starred; }

    constructor(private firebase: FirebaseService) {
        this.init();
        // this.starred = this.client.starred;
    }
    async init() {
        const client = await this.firebase.getClient('0');
        if (client) {
            const campaigns = await client.getCampaigns();
            if (campaigns)
                this.campaigns.next(campaigns);
            const notes = client.notes;
            if (notes)
                this.notes.next(notes);
            this.contact.next(Object.keys(client.contact));
        }
        this.client.next(client);
    }
    upLevel(details) {
        details.level = details.level > 0 ? details.level - 1 : details.level;
    }
    downLevel(details) {
        details.level = details.level < 5 ? details.level + 1 : details.level;
    }
    delNote(note: IClientNote, index: number) {
        if (note.details[index].note === '') note.details.splice(index, 1);
    }
    addNote(note: IClientNote, index: number) {
        note.details.splice(index + 1, 0, {
            level: note.details[index].level,
            note: ''
        });
    }
    test() {
        console.log('test');
    }
    drop(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.starred, event.previousIndex, event.currentIndex);
    }

    toggle(campaign: Campaign) {
        this.firebase.campaign = campaign;
        this.details.next(campaign);
    }

    getClient() {
        if (this.client.getValue())
            return this.client.getValue().ref.id;
        else return '';
    }

    ngOnInit() {}
    noteDrop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }
}
