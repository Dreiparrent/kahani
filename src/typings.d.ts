import videojs from 'video.js';

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