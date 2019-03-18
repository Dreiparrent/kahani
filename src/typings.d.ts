import videojs from 'video.js';
/* tslint:disable */
interface playRecord extends videojs.Player {
    record?: () => vjsRecord
    recordedData?: Blob;
}
interface playConfig extends videojs.PlayerOptions {
    controlBar: any;
}
interface vjsRecord {
    isRecording: () => boolean;
    getRecordType: () => 'image_only' | 'animation' | 'screen_only' | 'audio_only' | 'video_only' | 'audio_video';
    saveAs: () => void;
    destroy: () => void;
    reset: () => void;
    stopDevice: () => void;
    getDevice: () => void;
    getDuration: () => number;
    getCurrentTime: () => number;
    enumerateDevices: () => any;
    setAudioOutput: (deviceId: string) => void;
    start: () => void;
    stop: () => void;
    pause: () => void;
    resume: () => void;
    devices: MediaDeviceInfo[];
}
/* tslint:enable */
declare class RecordRTC {
    constructor(stream: MediaStream | HTMLCanvasElement | HTMLVideoElement | HTMLElement, options: {});
    // start the recording
    startRecording: () => void;

    // stop the recording
    // getBlob inside callback function
    stopRecording: () => Blob;

    // pause the recording
    pauseRecording: () => void;

    // resume the recording
    resumeRecording: () => void;

    // auto stop recording after specific duration
    setRecordingDuration: () => void;

    // reset recorder states and remove the data
    reset: () => void;

    // invoke save as dialog
    save: (fileName: string) => void;

    // returns recorded Blob
    getBlob: () => void;

    // returns Blob-URL
    toURL: () => void;

    // returns Data-URL
    getDataURL: () => string;

    // returns internal recorder
    getInternalRecorder: () => void;

    // initialize the recorder [deprecated]
    initRecorder: () => void;

    // fired if recorder's state changes
    onStateChanged: () => any;

    // write recorded blob into indexed-db storage
    writeToDisk: (audio: Blob, video: Blob, gif: Blob) => void;

    // get recorded blob from indexded-db storage
    getFromDisk: (dataURL: string, type: any) => void;
    // // [deprecated]
    // setAdvertisementArray: function ([webp1, webp2]) { },

    // [deprecated] clear recorded data
    clearRecordedData: () => void;

    // clear memory; clear everything
    destroy: () => void;

    // get recorder's state
    getState: () => void;

    // [readonly] property: recorder's state
    state: string;

    // recorded blob [readonly] property
    blob: Blob;

    // [readonly] array buffer; useful only for StereoAudioRecorder
    buffer: ArrayBuffer;

    // RecordRTC version [readonly]
    version: string;

    // [readonly] useful only for StereoAudioRecorder
    bufferSize: number;

    // [readonly] useful only for StereoAudioRecorder
    sampleRate: number;
}