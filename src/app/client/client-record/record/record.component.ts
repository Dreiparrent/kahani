import { FirebaseService } from './../../../firebase/firebase.service';
import { Component, OnInit, OnDestroy, ElementRef, Input, AfterViewInit, ViewEncapsulation, ViewChild } from '@angular/core';


// register videojs-record plugin with this import
// import * as Record from 'videojs-record/dist/videojs.record.js';
import { Record } from 'videojs-record/dist/videojs.record.js';
import { MatIcon } from '@angular/material';
import { environment } from 'src/environments/environment';
import { playRecord, playConfig } from 'src/typings';
import { ResizeService } from 'src/app/resize/resize.service';
import { Recorder } from './recorder';
// TODO: use video js built in converter... bc smh
@Component({
    selector: 'app-record',
    templateUrl: './record.component.html',
    styleUrls: ['./record.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RecordComponent implements OnInit, AfterViewInit, OnDestroy {
    public buttonColor = 'black';

    private _elementRef: ElementRef;

    // index to create unique ID for component
    @Input() videoId: string;
    @ViewChild('recordButton') recordButton: ElementRef<HTMLDivElement>;
    @ViewChild('pauseButton') pauseButton: ElementRef<HTMLDivElement>;
    @ViewChild('fsButton') fsButton: ElementRef<HTMLDivElement>;
    @ViewChild('camButton') camButton: ElementRef<HTMLDivElement>;

    private player: Recorder; // videojs.Player;
    constructor(private firebase: FirebaseService, private resize: ResizeService) {
    }

    ngOnInit() {}
    ngAfterViewInit() {
        // ID with which to access the template's video element
        // const el = 'video_' + this.idx;

    }
    initPlayer() {

    }

    playerListeners() {

    }
    ngOnDestroy(): void {
        this.player.destroy();
    }
}