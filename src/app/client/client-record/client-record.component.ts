import { Component, OnInit, ViewChild, AfterContentInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-client-record',
  templateUrl: './client-record.component.html',
  styleUrls: ['./client-record.component.scss']
})
export class ClientRecordComponent implements OnInit, AfterContentInit {

    @ViewChild('webCamVideo') webCamVideo: HTMLVideoElement;
    @ViewChild('webSource') webSource: HTMLSourceElement;
    public ws = '/assets/GC.mp4';
    public get videoWidth() {
        return window.innerWidth;
    }
    public get videoHeight() {
        return window.innerHeight;
    }
    public get videoOptions(): MediaTrackConstraints {
        return {
            // aspectRatio: 1.777777778,
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    constructor(private cdRef: ChangeDetectorRef) { }

    ngOnInit() {
        console.log('init');
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


        window.addEventListener('resize', () => {
            this.cdRef.detectChanges();
            const vid = document.getElementsByTagName('video')[0];
            const at = vid.getAttribute('width');
            console.log(at);
            vid.setAttribute('width', window.innerWidth.toString());
            vid.setAttribute('height', window.innerHeight.toString());
            // vid.setAttribute('aspectRatio', `${window.innerWidth / window.innerHeight}`);
            // vid.setAttribute('videoWidth', window.innerWidth.toString());
            // console.log(vid.getAttribute('aspectRatio'));
        });
    }

    ngAfterContentInit(): void {
        // const vid = document.getElementsByTagName('video')[0];
        // vid.videoTracks.addEventListener('addtrack', (ev) => console.log(ev));
        // navigator.getDisplayMedia({ video: true, audio: true }).then(s => console.log(s));
        // navigator.getUserMedia({
        //     video: true,
        //     audio: true
        // }, function (e: MediaStream) {
        //     console.log('got', e);
        // }, function (e) {
        //     console.log('notGot', e);
        //     });
        navigator.mediaDevices.enumerateDevices().then(d => {
            console.log(d.map(dd => dd.kind));
            return d;
        }).then((d) => {
            return d.find(dd => dd.kind === 'videoinput');
        }).then(async (v: MediaDeviceInfo) => {
            const vv = await v;
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: { exact: vv.deviceId }
                },
                audio: false
            });
            // console.log(this.webCamVideo);
            // this.webSource
            // this.webCamVideo.innerHTML = '<source src="assets/GC.mp4">';
            // this.webSource.src = '';
            // this.webCamVideo.src = await window.URL.createObjectURL(stream);
            // this.webCamVideo.play();
        });
    }

}
