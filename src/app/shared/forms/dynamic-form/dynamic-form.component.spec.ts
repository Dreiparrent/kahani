import { MaterialStubModule } from './../../../firebase/material.stub';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { QuestionBase } from '../question-base';
import { Input, Component } from '@angular/core';
/* tslint:disable */
@Component({ selector: 'app-question', template: '' })
export class QuestionStubComponent {
    @Input() question: QuestionBase<any>;
    @Input() form: FormGroup;
}
/* tslint:enable */
describe('DynamicFormComponent', () => {
    let component: DynamicFormComponent<any>;
    let fixture: ComponentFixture<DynamicFormComponent<any>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicFormComponent, QuestionStubComponent],
            imports: [MaterialStubModule, ReactiveFormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormComponent);
        component = fixture.componentInstance;
        component.questions = environment.clientConfig.userQuestions;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});