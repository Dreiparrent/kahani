import { DynamicFormComponent } from './../../../shared/forms/dynamic-form/dynamic-form.component';
import { QuestionBase } from './../../../shared/forms/question-base';
import { environment } from 'src/environments/environment';
import { Component, OnInit, Inject, InjectionToken, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatButtonToggle, ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';


@Component({
    selector: 'app-prerecord',
    templateUrl: './prerecord.component.html',
    styleUrls: ['./prerecord.component.scss']
})
export class PrerecordComponent<T> implements OnInit {
    public videoDevices: MediaDeviceInfo[] = [];
    public audioDevices: MediaDeviceInfo[] = [];
    @ViewChild('videoToggle') videoToggle: MatButtonToggle;
    @ViewChild('audioToggle') audioToggle: MatButtonToggle;
    @ViewChild('userForm') userForm: DynamicFormComponent<T>;
    @ViewChild('extraForm') extraForm: DynamicFormComponent<any>;
    public openExtra = environment.recorder.popup.autoOpenExtra;
    public extraQuestions: QuestionBase<any>[];
    get isDisabled() {
        let disabled = this.userForm.form.invalid;
        if (this.extraForm)
            disabled = disabled || this.extraForm.form.invalid;
        return disabled;
    }

    constructor(
        public dialogRef: MatDialogRef<PrerecordComponent<T>, IDialogData>,
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
        if (data.extraQuestions)
            this.extraQuestions = data.extraQuestions;
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

    ngOnInit() { }

    sendDevices(): IPreOutput<T> {
        const preoutput: IPreOutput<T> = {
            video: this.videoToggle.value,
            audio: this.audioToggle.value,
            userDetails: this.userForm.data
        };
        if (this.extraForm && this.extraForm.form.touched)
            preoutput.extraDetails = this.extraForm.data;
        // console.log(preoutput);
        return preoutput;
    }
}
export interface IDialogData {
    devices: MediaDeviceInfo[];
    updating: boolean;
    userQuestions: QuestionBase<any>[];
    extraQuestions?: QuestionBase<any>[];
}
export interface IPreOutput<T> {
    video: string;
    audio: string;
    userDetails: T;
    extraDetails?: any;
}