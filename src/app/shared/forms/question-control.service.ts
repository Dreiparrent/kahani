import { FormControl, Validators, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import { QuestionBase, QuestionType } from './question-base';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

    constructor() { }
    toFormGroup(questions: QuestionBase<any>[]) {
        // let group: {[key: string]: AbstractControl} = {}; //tslint:disable-line
        const group: { [key: string]: AbstractControl }
            = questions.reduce((prev: { [key: string]: AbstractControl }, curr) => {
                const validators: ValidatorFn[] = [Validators.required];

                if (curr.controlType === QuestionType.textbox && curr.type === 'email')
                    validators.push(Validators.email);

                prev[curr.key] = curr.required ? new FormControl(curr.value || '', validators)
                    : new FormControl(curr.value || '');
            return prev;

            }, {});
        // questions.forEach(question => {
        //     group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        //         : new FormControl(question.value || '');
        // });
        return new FormGroup(group);
    }
}
