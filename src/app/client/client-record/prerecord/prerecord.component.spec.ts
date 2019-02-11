import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerecordComponent, IDialogData } from './prerecord.component';
import {
    StubMaterialModule,
    StubMatDialogRef
} from 'src/app/firebase/material.stub';
import { InjectionToken, Component } from '@angular/core';

const testData = {
    devices: [],
    updating: false
};

describe('PrerecordComponent', () => {
    let component: PrerecordComponent;
    // component.data = testData;
    let fixture: ComponentFixture<PrerecordComponent>;
    const data = testData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PrerecordComponent],
            imports: [StubMaterialModule],
            providers: [
                { provide: MatDialogRef, useClass: StubMatDialogRef },
                { provide: MAT_DIALOG_DATA, useValue: testData },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrerecordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
