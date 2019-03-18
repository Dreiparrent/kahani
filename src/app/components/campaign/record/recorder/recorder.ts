/// <reference types="@types/dom-mediacapture-record" />
import { RecordRTC, RecordRTCPromisesHandler, CanvasRecorder } from 'recordrtc';
// import { RecordRTC as rct } from 'src/typings';
export class Recorder {
    private recorder: MediaRecorder;
    private recordChunks = [];
    private shouldStop = false;
    private stopped = false;
    constructor(public stream: MediaStream) {
        console.log(stream);
        this.onData = this.onData.bind(this);
        stream.addEventListener('active', (e) => {
            console.log(e);
        });
        this.initt(stream);
        // this.recorder = new MediaRecorder(stream, {
        //     mimeType: 'video/webm'
        // });
        // this.init();
    }
    // public getDevices() {
    //     navigator.mediaDevices.enumerateDevices().then(devices => {
    //         console.log(devices);
    //     })
    // }
    initt = async (stream: MediaStream) => {
        const recorder: any = new RecordRTCPromisesHandler(stream, {
            type: 'video',
            recorderType: CanvasRecorder
        });
        recorder.startRecording();
        const sleep = (m: any) => new Promise(r => setTimeout(r, m));
        await sleep(3000);

        await recorder.stopRecording();
        const blob = await recorder.getBlob();
        console.log(blob);
        // invokeSaveAsDialog(blob);
    }
    init() {
        this.recorder.addEventListener('dataavailable', this.onData);
        this.recorder.addEventListener('stop', this.onStop);
        setTimeout(() => {
            this.recorder.stop();
        }, 2000);
        this.start();
    }
    private onData = (e: any) => {
        if (e.data.size > 0)
            this.recordChunks.push(e.data);
        if (this.shouldStop && !this.stopped) {
            this.recorder.stop();
            this.stopped = true;
        }
    }
    private onStop = () => {
        console.log(this.recordChunks);
    }
    public recordReady() {}
    public start() {
        this.recorder.start();
        // this.stream
    }
}
