import { IBaseUserData } from './../../firebase/constatnts';
import { Record } from 'videojs-record/dist/videojs.record.js';
import { FirebaseService } from './../../firebase/firebase.service';
import {
    Component, OnInit, ViewChild, ElementRef, ViewEncapsulation
} from '@angular/core';
import { QuestionComponent } from './question/question.component';
// import { RecordComponent } from './record/record.component';
import { ResizeService } from 'src/app/resize/resize.service';
import { Recorder } from './record/recorder';
import { playConfig } from 'src/typings';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';
import { PrerecordComponent, IDialogData, IPreOutput } from './prerecord/prerecord.component';

@Component({
    selector: 'app-client-record',
    templateUrl: './client-record.component.html',
    styleUrls: ['./client-record.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientRecordComponent implements OnInit {
    @ViewChild('question') question: QuestionComponent;
    @ViewChild('outer') outer: ElementRef<HTMLDivElement>;
    @ViewChild('vidSec') vidSec: ElementRef<HTMLDivElement>;
    @ViewChild('recordButton') recordButton: ElementRef<HTMLDivElement>;
    @ViewChild('pauseButton') pauseButton: ElementRef<HTMLDivElement>;
    @ViewChild('fsButton') fsButton: ElementRef<HTMLDivElement>;
    @ViewChild('camButton') camButton: ElementRef<HTMLDivElement>;
    @ViewChild('stopButton') stopButton: ElementRef<HTMLDivElement>;
    @ViewChild('spinner') spinner: ElementRef<HTMLDivElement>;
    @ViewChild('startPopup') startPopup: ElementRef<HTMLDivElement>;
    @ViewChild('sendPopup') sendPopup: ElementRef<HTMLDivElement>;
    public buttonColor = environment.recorder.buttonColor;
    recordInit = false;
    spinnerProgress = 0;
    _recordProgress = 4;
    userData: IBaseUserData = { name: '', email: '' };
    get recordText() {
        switch (this._recordProgress) {
            case 0:
                return 'Go';
            case 1:
            case 2:
            case 3:
                return this._recordProgress.toString();
            case 4:
            default:
                return '';
        }
    }
    get recordStop() {
        return this._recordProgress === 4 ? 'Start' : 'Stop';
    }
    player: Recorder;
    deviceList: MediaDeviceInfo[] = [];
    public videoDevice = '';
    public audioDevice = '';
    get config(): playConfig {
        return {
            autoplay: true,
            controls: false,
            fluid: true,
            // loop: false,
            // width: 320,
            // height: 240,
            controlBar: {
                volumePanel: false
            },
            plugins: {
                record: {
                    audio: {
                        optional: [{ sourceId: this.audioDevice }],
                        muted: false
                    },
                    video: {
                        optional: [{ sourceId: this.videoDevice }]
                    },
                    debug: !environment.production,
                    maxLength: 60
                }
            }
        };
    }

    constructor(private dialog: MatDialog, private resizeService: ResizeService, private firebase: FirebaseService) { }
    // TODO: absolute the time and have appear at the top
    // TODO: put recoding indicator to the right of the time
    // TODO: remove bottom bar color
    // TODO: keep position of play/pause button at bottom
    // TODO: keep position of fs button at the bottom right of the screen
    ngOnInit() {
        // navigator.permissions.query({ name: 'microphone' })
        //     .then((permissionObj) => {
        //         console.log(permissionObj.state);
        //     })
        //     .catch((error) => {
        //         console.log('Got error :', error);
        //     })

        // navigator.permissions.query({ name: 'camera' })
        //     .then((permissionObj) => {
        //         console.log(permissionObj.state);
        //     })
        //     .catch((error) => {
        //         console.log('Got error :', error);
        //     });

        // window.addEventListener('resize', () => {
        //     this.cdRef.detectChanges();
        //     const vid = document.getElementsByTagName('video')[0];
        //     const at = vid.getAttribute('width');
        //     // console.log(at);
        //     vid.setAttribute('width', window.innerWidth.toString());
        //     vid.setAttribute('height', window.innerHeight.toString());
        //     // vid.setAttribute('aspectRatio', `${window.innerWidth / window.innerHeight}`);
        //     // vid.setAttribute('videoWidth', window.innerWidth.toString());
        //     // console.log(vid.getAttribute('aspectRatio'));
        // });
        this.resizeService.window.subscribe(w => {
            this.setOver();
        });
        this.player = new Recorder(this.outer.nativeElement, 1, this.config, {
            record: this.recordButton.nativeElement,
            pause: this.pauseButton.nativeElement,
            fullscreen: this.fsButton.nativeElement,
            cam: this.camButton.nativeElement,
            stop: this.stopButton.nativeElement
        }, this.firebase.uploadRecord.bind(this), this.resetRecord.bind(this), this.recordReady.bind(this), this.deviceReady.bind(this));

    }

    overQ(over: boolean) {
        console.log(over);
    }

    recordReady(devices: MediaDeviceInfo[], initial: boolean, change = false) {
        // this.spinner.nativeElement.style.display = initial ? 'block' : 'none';
        this.spinner.nativeElement.style.left = `calc(50vw + ${this.question.outer.nativeElement.clientWidth}px)`;
        this.deviceList = devices;
        if (change)
            this.resetRecord();
        if (initial) {
            const sendData: IDialogData = {
                devices: this.deviceList, updating: change,
                userQuestions: this.firebase.testClientConfig.userQuestions,
            };
            if (this.firebase.testClientConfig.extraQuestions)
                sendData.extraQuestions = this.firebase.testClientConfig.extraQuestions;
            console.log(sendData, this.firebase.testClientConfig);
            const dialogRef = this.dialog.open<PrerecordComponent<IBaseUserData>, IDialogData, IPreOutput<IBaseUserData>>(
                PrerecordComponent, {
                    disableClose: true,
                    data: sendData
                });
            dialogRef.afterClosed().subscribe(result => {
                this.videoDevice = result.video;
                this.audioDevice = result.audio;
                this.player.destroy();
                this.player.init(this.config);
                this.userData = result.userDetails;
                this.firebase.testClientConfig.userQuestions.map(q => {
                    q.value = result.userDetails[q.key];
                });
                if (result.extraDetails)
                    this.firebase.testClientConfig.extraQuestions.map(q => {
                        q.value = result.extraDetails[q.key];
                    });
            });
            if (environment.recorder.popup.skip)
                dialogRef.close({
                    video: environment.recorder.videoDevice,
                    audio: '', userDetails: { name: 'name', email: 'email' }
                });
        }
        // this.player.start();
    }

    deviceReady() {
        if (!this.recordInit)
            this.setOver();
        this.startPopup.nativeElement.style.display = 'block';
        this.startPopup.nativeElement.style.right =
            this.spinner.nativeElement.style.right =
            `calc(50vw - ${this.question.outer.nativeElement.clientWidth / 2}px)`;
        this.startPopup.nativeElement.style.top = '50vh';
        if (!this.recordInit && environment.recorder.countdown.skip)
            this.recordClick();
        this.recordInit = true;
    }

    recordClick() {
        if (this.player.player.record().isRecording())
            this.player.player.record().stop();
        else
            this.startRecord();
    }

    startRecord() {
        this.startPopup.nativeElement.style.display = 'none';
        this.sendPopup.nativeElement.style.right = this.question.isOverlay ? '30vw' : '-30vw';
        this.startPopup.nativeElement.style.transform = 'translate(-50%)';
        let reset = true;
        this._recordProgress = 3;
        this.spinnerProgress = 100;
        const playButton = document.getElementsByClassName('vjs-play-control')[0] as HTMLDivElement;
        if (playButton)
            playButton.style.right = this.question.isOverlay ? '30vw' : '-30vw';
        if (environment.recorder.countdown.skip) {
            if (environment.recorder.countdown.start) {
                this.startPopup.nativeElement.style.display = 'block';
                this.startPopup.nativeElement.style.right = '3vw';
                this.spinner.nativeElement.style.display = 'none';
                this.spinnerProgress = 0;
                this.player.beginRecord();
            } else {
                this.spinnerProgress = 100;
            }
        } else {
            const interval = setInterval(() => {
                // if (this.spinnerProgress  100)
                //     this.spinnerProgress = 0;
                if (reset)
                    this.spinnerProgress -= 100;
                else this.spinnerProgress += 100;
                this._recordProgress -= 1;
                reset = !reset;
            }, 1000);
            setTimeout(() => {
                clearInterval(interval);
                this.startPopup.nativeElement.style.display = 'block';
                this.startPopup.nativeElement.style.right = '3vw';
                this.spinner.nativeElement.style.display = 'none';
                this.spinnerProgress = 0;
                this.player.beginRecord();
            }, 3900);
        }
    }
    resetRecord(afterVideo = false) {
        this.sendPopup.nativeElement.style.display = 'block';
        this.sendPopup.nativeElement.style.right = '3vw';
        const playButton = document.getElementsByClassName('vjs-play-control')[0] as HTMLDivElement;
        playButton.style.right = '3vw';
        this._recordProgress = 4;
        this.spinner.nativeElement.style.display = 'block';
    }
    sendRecord() {
        if (!environment.recorder.upload.skip) {
            console.log('send');
        }
    }

    setOver() {
        if (this.recordInit)
            this.deviceReady();
        const videoElem = document.getElementById('video_1');
        const controlBar = document.getElementsByClassName(
            'vjs-control-bar'
        ) as HTMLCollectionOf<HTMLElement>;
        const videoPlayer = document.getElementsByTagName('video');
        if (this.question.isOverlay && controlBar[0].clientWidth > 250) {
            this.question.isOverlay = false;
            this.vidSec.nativeElement.className = '';
        } else if (!this.question.isOverlay && this.question.shouldOverlay) {
            this.question.isOverlay = true;
            this.vidSec.nativeElement.className = 'videoOver';
        }
        this.startPopup.nativeElement.style.right = '3vw';
        this.sendPopup.nativeElement.style.right = this.question.isOverlay ? '30vw' : '-30vw';
    }
}