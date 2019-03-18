import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { ResizeService } from 'src/app/shared/resize/resize.service';
import { MatDialog } from '@angular/material';
import { ClientRecordComponent } from './record.component';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
describe('ClientRecordComponent', () => {
    let component: ClientRecordComponent;
    let fixture: ComponentFixture<ClientRecordComponent>;
    beforeEach(() => {
        const firebaseServiceStub = {
            uploadRecord: { bind: () => ({}) },
            campaign: {
                userQuestions: { map: () => ({}) },
                extraQuestions: { map: () => ({}) }
            }
        };
        const resizeServiceStub = { window: of('window') };
        const matDialogStub = {
            open: () => ({
                afterClosed: () => ({ subscribe: () => ({}) }),
                close: () => ({})
            })
        };
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ClientRecordComponent],
            providers: [
                { provide: FirebaseService, useValue: firebaseServiceStub },
                { provide: ResizeService, useValue: resizeServiceStub },
                { provide: MatDialog, useValue: matDialogStub }
            ]
        });
        fixture = TestBed.createComponent(ClientRecordComponent);
        component = fixture.componentInstance;
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
    it('buttonColor defaults to: environment.recorder.buttonColor', () => {
        expect(component.buttonColor).toEqual(environment.recorder.buttonColor);
    });
    it('recordInit defaults to: false', () => {
        expect(component.recordInit).toEqual(false);
    });
    it('spinnerProgress defaults to: 0', () => {
        expect(component.spinnerProgress).toEqual(0);
    });
    it('_recordProgress defaults to: 4', () => {
        expect(component._recordProgress).toEqual(4);
    });
    it('deviceList defaults to: []', () => {
        expect(component.deviceList).toEqual([]);
    });
    it('buttonPosition defaults to: -30vw', () => {
        expect(component.buttonPosition).toEqual('-30vw');
    });
    describe('ngOnInit', () => {
        it('makes expected calls', () => {
            spyOn(component, 'isOver');
            component.ngOnInit();
            expect(component.isOver).toHaveBeenCalled();
        });
    });
    xdescribe('deviceReady', () => {
        beforeEach(() => {
            spyOn(component, 'isOver');
            spyOn(component, 'recordClick');
            spyOnProperty(component.startPopup, 'nativeElement');
            spyOnProperty(component.spinner, 'nativeElement');
            component.deviceReady();
        })
        it('makes expected calls', () => {
            component.recordInit = true;
            expect(component.isOver).toHaveBeenCalled();
        });
        it('makes expected calls', () => {
            component.recordInit = false;
            if (environment.recorder.countdown.skip)
                expect(component.recordClick).toHaveBeenCalled();
            else
                expect(component.recordClick).not.toHaveBeenCalled();
        });
    });
    describe('recordClick', () => {
        it('makes expected calls', () => {
            spyOn(component, 'startRecord');
            component.player = {
                player: {
                    record: () => ({ isRecording: () => (false) })
                }
            } as any;
            component.recordClick();
            expect(component.startRecord).toHaveBeenCalled();
        });
        xit('makes expected calls', () => {
            spyOn(component, 'startRecord');
            component.player = {
                player: {
                    record: () => ({ isRecording: () => (true) })
                }
            } as any;
            component.recordClick();
            expect(component.startRecord).toHaveBeenCalled();
        });
    });
    describe('isOver', () => {
        it('makes expected calls', () => {
            spyOn(component, 'deviceReady');
            component.recordInit = true;
            component.isOver();
            expect(component.deviceReady).toHaveBeenCalled();
        });
    });
});
