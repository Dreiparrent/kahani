interface IQuestionOptions<T> {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: QuestionType;
}
interface TQuestionOptions extends IQuestionOptions<string> {
    type?: string;
}
interface DQuestionOptions extends IQuestionOptions<string> {
    options?: { key: string; value: string }[];
}
export class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: QuestionType;
    type?: string;
    options?: { key: string; value: string }[];
    constructor(options: IQuestionOptions<T> = {}) {
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || QuestionType.textbox;
    }
}
export class TextboxQuestion extends QuestionBase<string> {
    controlType = QuestionType.textbox;
    type: string;
    constructor(options: TQuestionOptions = {}) {
        super(options);
        this.value = options.value ? options.value : '';
        this.type = options['type'] || '';
    }
}
export class DropdownQuestion extends QuestionBase<string> {
    controlType = QuestionType.dropdown;
    options: { key: string; value: string }[] = [];

    constructor(options: DQuestionOptions = {}) {
        super(options);
        this.value = options.value ? options.value : '';
        this.options = options['options'] || [];
    }
}
export enum QuestionType {
    textbox, dropdown
}