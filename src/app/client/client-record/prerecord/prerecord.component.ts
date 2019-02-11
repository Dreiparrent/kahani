import { environment } from 'src/environments/environment';
import { Component, OnInit, Inject, InjectionToken, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatButtonToggle } from '@angular/material';

@Component({
    selector: 'app-prerecord',
    templateUrl: './prerecord.component.html',
    styleUrls: ['./prerecord.component.scss']
})
export class PrerecordComponent implements OnInit {
    public videoDevices: MediaDeviceInfo[] = [];
    public audioDevices: MediaDeviceInfo[] = [];
    @ViewChild('videoToggle') videoToggle: MatButtonToggle;
    @ViewChild('audioToggle') audioToggle: MatButtonToggle;
    public openExtra = environment.recorder.popup.autoOpenExtra;
    constructor(
        public dialogRef: MatDialogRef<PrerecordComponent, IDialogData>,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData
    ) {
        this.videoDevices = this.data.devices.filter(d => {
            if (d.kind === 'videoinput')
                return d;
        });
        this.audioDevices = this.data.devices.filter(d => {
            if (d.kind === 'audioinput')
                return d;
        });
        console.log(this.videoDevices);
        if (this.videoDevices.filter(d => {
            if (d.label !== '')
                return d.label;
        }).length < 1)
            alert('Cannot get video devices (proper popup coming soon)');
        if (this.audioDevices.filter(d => {
            if (d.label !== '')
                return d.label;
        }).length < 1)
            alert('Cannot get audio devices (proper popup coming soon)');
    }

    ngOnInit() {}

    sendDevices(): IPreOutput {
        return {
            video: this.videoToggle.value,
            audio: this.audioToggle.value
        };
    }
}
export interface IDialogData {
    devices: MediaDeviceInfo[];
    updating: boolean;
}
export interface IPreOutput {
    video: string;
    audio: string;
}