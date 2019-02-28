import { environment } from 'src/environments/environment';
import { MaterialStubModule } from 'src/app/firebase/material.stub';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { QuestionControlService } from '../question-control.service';

describe('DynamicFormQuestionComponent', () => {
    let component: DynamicFormQuestionComponent;
    let fixture: ComponentFixture<DynamicFormQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicFormQuestionComponent],
            imports: [MaterialStubModule, ReactiveFormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormQuestionComponent);
        component = fixture.componentInstance;
        component.question = environment.clientConfig.userQuestions[0];
        const expectedFormGroup = new QuestionControlService().toFormGroup(environment.clientConfig.userQuestions)
        component.form = expectedFormGroup;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
