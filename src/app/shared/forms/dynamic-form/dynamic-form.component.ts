import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionBase } from '../question-base';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../question-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent<T> implements OnInit {
    @Input() questions: QuestionBase<any>[] = [];
    form: FormGroup;
    @Output() submit = new EventEmitter<T>();

    constructor(private qcs: QuestionControlService) { }

    ngOnInit() {
        this.form = this.qcs.toFormGroup(this.questions);
    }

    onSubmit() {
        this.submit.next(this.form.value);
        // this.payLoad = JSON.stringify(this.form.value);
    }

    get data(): T {
        return this.form.value;
    }
}
