import { environment } from './../../../../environments/environment';
import { playRecord, playConfig } from 'src/typings';
import videojs from 'video.js';
import * as adapter from 'webrtc-adapter/out/adapter_no_global.js';
import * as RecordRTC from 'recordrtc';
import { Record } from 'videojs-record/dist/videojs.record.js';

export class Recorder {
    public player: playRecord;
    private plugin: any;
    public videoDevice: string;
    private videoInner = `<video id="video_${this.index}" class="video-js vjs-default-skin"></video>`;

    constructor(private outer: HTMLDivElement, private index: number, private config: playConfig,
        private buttons: {
            record: HTMLDivElement, pause: HTMLDivElement, fullscreen: HTMLDivElement, cam: HTMLDivElement,
            stop: HTMLDivElement
        }, private upload: (recording: Blob) => void,
        private resetOverlay: (afterRecord: boolean) => void,
        private recordReady: (devices: MediaDeviceInfo[], initial: boolean) => void, private deviceReady: () => void) {
        this.init(this.config, true);
    }

    public init(config: playConfig, listen = false) {
        if (this.outer.innerHTML !== this.videoInner)
            this.outer.innerHTML = this.videoInner;
        this.plugin = Record; // to initialize
        this.player = videojs(document.getElementById(`video_${this.index}`), config, () => {
            console.log('player ready! id:');
            // print version information at startup
            const msg =
                'Using video.js ' +
                videojs.VERSION +
                ' with videojs-record ' +
                videojs.getPluginVersion('record') +
                ' and recordrtc ' +
                RecordRTC.version;
            videojs.log(msg);
            this._setButton(document.getElementsByClassName('vjs-device-button')[0], VidButtons.cam);
        });
        this.player.record().enumerateDevices();
        this.listeners(listen);
        if (!listen)
            this.start();
    }

    public listeners(listen: boolean) {
        this.player.on('deviceReady', () => {
            // (d => console.log(d));
            console.log('device is ready!');
            // this.recordReady(this.player.record().devices, listen);
            this.addButtons();
            this.deviceReady();
            // this.player.record
        });
        this.player.on('enumerateReady', () => {
            // const inputSection = document.getElementsByClassName('inputSelector')[0] as HTMLDivElement;
            // inputSection.style.display = 'block';
            // this.deviceUpdate(this.player.record().devices);
            this.recordReady(this.player.record().devices, listen);
            // const devices = this.player.record().devices;
        });
        this.player.on('startRecord', () => {
            console.log('started recording!');
            this._setButton(document.getElementsByClassName('vjs-record-button')[0], VidButtons.stop);
            // document.getElementsByClassName('vjs-record-button')[0].innerHTML = '';
        });
        this.player.on('finishRecord', () => {
            console.log('finished recording: ', this.player.recordedData);
            this._setButton(document.getElementsByClassName('vjs-record-button')[0], VidButtons.record);
            this.resetOverlay(true);
            // this.upload(this.player.recordedData);
        });
        this.player.on('error', error => {
            console.log('error');
            console.warn(error);
        });
    }

    addButtons() {
        const elems: Element[] = [];
        elems.push(
            document.getElementsByClassName('vjs-record-button')[0],
            document.getElementsByClassName('vjs-play-control')[0],
            document.getElementsByClassName('vjs-fullscreen-control')[0]
        );
        elems.forEach((e, i) => {
            this._setButton(e, i);
        });
    }
    _setButton(e: Element, i: VidButtons) {
        e.innerHTML = '';
        e.appendChild(this.buttons[VidButtons[i]]);
    }

    public start() {
        setTimeout(() => {
            const deviceButton = document.getElementsByClassName('vjs-device-button')[0];
            (deviceButton as HTMLButtonElement).click();
            // this.player.record().start();
        }, 1000);
    }

    public beginRecord() {
        this.player.record().start();
    }

    public reset(config?: playConfig) {
        if (this.player)
            this.player.record().reset();
    }

    public destroy() {
        if (this.player) {
            this.player.dispose();
            this.player = null;
        }
    }
}
enum VidButtons {
    record, pause, fullscreen, cam, stop
}