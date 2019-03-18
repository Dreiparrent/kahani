import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientPrerecordComponent, IDialogData } from './prerecord.component';
import { environment } from 'src/environments/environment';
import { MatExpansionPanelStubModule } from 'src/app/shared/firebase/material.stub';
const testData: IDialogData = {
    devices: [],
    updating: false,
    userQuestions: environment.clientConfig.userQuestions.map as any,
    extraQuestions: environment.clientConfig.extraQuestions as any
};
describe('ClientPrerecordComponent', () => {
    let component: ClientPrerecordComponent<any>;
    let fixture: ComponentFixture<ClientPrerecordComponent<any>>;
    beforeEach(() => {
        const matDialogRefStub = {};
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ClientPrerecordComponent],
            imports: [MatExpansionPanelStubModule],
            providers: [{ provide: MatDialogRef, useValue: matDialogRefStub },
                { provide: MAT_DIALOG_DATA, useValue: testData }]
        });
        fixture = TestBed.createComponent(ClientPrerecordComponent);
        component = fixture.componentInstance;
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
    it('videoDevices defaults to: []', () => {
        expect(component.videoDevices).toEqual([]);
    });
    it('audioDevices defaults to: []', () => {
        expect(component.audioDevices).toEqual([]);
    });
    it('openExtra defaults to: environment.recorder.popup.autoOpenExtra', () => {
        expect(component.openExtra).toEqual(
            environment.recorder.popup.autoOpenExtra
        );
    });
});
