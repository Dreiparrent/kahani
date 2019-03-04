export enum QuestionType {
    textbox, number, color, dropdown
}
interface IQuestionOptions<T> {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: QuestionType;
    dependent?: {
        key: string;
        value: any;
    };
    hidden?: boolean;
}
export interface TQuestionOptions<T> extends IQuestionOptions<T> {
    type?: string;
}
export interface DQuestionOptions extends IQuestionOptions<string | number> {
    options?: { key: string | number; value: string | number }[];
}
export class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: QuestionType;
    type?: string;
    options?: { key: string | number; value: T }[];
    dependent?: {
        key: string;
        value: any;
    };
    hidden: boolean;
    constructor(options: IQuestionOptions<T> = {}) {
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || QuestionType.textbox;
        this.dependent = options.dependent ? options.dependent : null;
        this.hidden = options.hidden ? true : false;
    }
}
export class TextboxQuestion extends QuestionBase<string> {
    controlType = QuestionType.textbox;
    type: string;
    constructor(options: TQuestionOptions<string> = {}) {
        super(options);
        this.value = options.value ? options.value : '';
        this.type = options['type'] || 'text';
    }
}
export class NumberQuestion extends QuestionBase<number> {
    controlType = QuestionType.textbox;
    type: string;
    constructor(options: TQuestionOptions<number> = {}) {
        super(options);
        this.value = options.value ? options.value : 0;
        this.type = options['type'] || 'number';
    }
}
export class ColorQuestion extends QuestionBase<any> {
    controlType = QuestionType.color;
    type: string;
    constructor(options: TQuestionOptions<any> = {}) {
        super(options);
        this.value = options.value ? options.value : '';
        this.type = options['type'] || 'color';
    }
}
export class DropdownQuestion extends QuestionBase<string | number> {
    controlType = QuestionType.dropdown;
    type = QuestionType[QuestionType.dropdown];
    options: { key: string | number; value: string | number }[] = [];

    constructor(options: DQuestionOptions = {}) {
        super(options);
        this.value = options.value ? options.value : '';
        this.options = options['options'] || [];
    }
}