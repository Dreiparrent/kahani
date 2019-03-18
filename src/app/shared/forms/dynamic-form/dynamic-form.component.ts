import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { QuestionBase } from '../question-base';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../question-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent<T> implements OnInit, OnDestroy {
    @Input() questions: QuestionBase<any>[] = [];
    form: FormGroup;
    @Output() submit = new EventEmitter<T>();
    @Output() changes = new EventEmitter<{[key: string]: any}>();
    private valueChanges: Subscription;

    constructor(private qcs: QuestionControlService) { }

    ngOnInit() {
        this.form = this.qcs.toFormGroup(this.questions);
        this.valueChanges = this.form.valueChanges.subscribe(changes => {
            console.log(changes);
            this.changes.next(changes);
        });
    }

    onSubmit() {
        this.submit.next(this.form.value);
        // this.payLoad = JSON.stringify(this.form.value);
    }

    get data(): T {
        return this.form.value;
    }

    shouldHide(question: QuestionBase<any>) {
        if (question.dependent) {
            const depVal = this.questions.find(q => q.key === question.dependent.key).value;
            return depVal === question.dependent.value;
        }
        return true;
    }
    ngOnDestroy() {
        this.valueChanges.unsubscribe();
    }
}
