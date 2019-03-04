import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { QuestionBase, QuestionType } from '../question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent implements OnInit {
    @Input() question: QuestionBase<any>;
    @Input() form: FormGroup;
    questionType = QuestionType;
    hasError(errType: string) {
        return this.form.controls[this.question.key].hasError(errType);
    }
    // type: string;
    constructor() {
        // this.type = this.question.controlType
    }

    ngOnInit() {
        // if (this.question.dependent)
    }
}
