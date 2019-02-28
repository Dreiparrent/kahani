import { QuestionControlService } from './../../../shared/forms/question-control.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { QuestionBase } from './../../../shared/forms/question-base';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerecordComponent, IDialogData } from './prerecord.component';
import {
    MaterialStubModule,
    MatDialogRefStub
} from 'src/app/firebase/material.stub';
import { InjectionToken, Component, Input } from '@angular/core';

const testData: IDialogData = {
    devices: [],
    updating: false,
    userQuestions: environment.clientConfig.userQuestions,
    extraQuestions: environment.clientConfig.extraQuestions
};

@Component({ selector: 'app-dynamic-form', template: '' })
class DynamicFormStubComponent<T> {
    @Input() questions: QuestionBase<T>[];
    form = new QuestionControlService().toFormGroup(environment.clientConfig.userQuestions);
}

describe('PrerecordComponent', () => {
    let component: PrerecordComponent<any>;
    // component.data = testData;
    let fixture: ComponentFixture<PrerecordComponent<any>>;
    const data = testData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PrerecordComponent, DynamicFormStubComponent],
            imports: [MaterialStubModule],
            providers: [
                { provide: MatDialogRef, useClass: MatDialogRefStub },
                { provide: MAT_DIALOG_DATA, useValue: testData },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrerecordComponent);
        component = fixture.componentInstance;
        // component.userForm = component.
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
