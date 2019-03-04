import { NgModule } from '@angular/core';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuestionControlService } from './question-control.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
    declarations: [
        DynamicFormQuestionComponent,
        DynamicFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ColorPickerModule
    ],
    providers: [
        QuestionControlService
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DynamicFormQuestionComponent,
        DynamicFormComponent,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ]
})
export class KahaniFormsModule { }