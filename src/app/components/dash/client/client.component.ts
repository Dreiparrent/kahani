import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { Client, Campaign, IClientNote, StarType, ContentType } from 'src/app/shared/firebase/constatnts';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-campaign',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
    @Output() details = new EventEmitter<Campaign>();
    public client: Client;
    public get contact() {
        return Object.values(this.client.contact);
    }
    public get campaigns() { return this.client.campaigns; }
    public get notes() { return this.client.notes; }
    public starred: { type: StarType; details: IClientNote | Campaign }[];
    public contentType = ContentType;
    public note1: ['1'];
    public note2: ['2'];
    public note3: ['3'];
    // public get starred() { return this.client.starred; }

    constructor(private firebase: FirebaseService) {
        this.client = firebase.client;
        this.starred = this.client.starred;
    }
    upLevel(details) {
        details.level = details.level > 0 ? details.level - 1 : details.level;
    }
    downLevel(details) {
        details.level = details.level < 5 ? details.level + 1 : details.level;
    }
    delNote(note: IClientNote, index: number) {
        if (note.details[index].note === '')
        note.details.splice(index, 1);
    }
    addNote(note: IClientNote, index: number) {
        note.details.splice(index + 1, 0, { level: note.details[index].level, note: '' });
    }
    test() {
        console.log('test');
    }
    drop(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.starred, event.previousIndex, event.currentIndex);
    }

    toggle(campaign: Campaign) {
        this.details.next(campaign);
    }

    ngOnInit() {
    }
    noteDrop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }
}
