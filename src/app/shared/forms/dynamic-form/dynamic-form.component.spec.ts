import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { QuestionBase } from '../question-base';
import { QuestionControlService } from '../question-control.service';
import { DynamicFormComponent } from './dynamic-form.component';
describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent<any>;
  let fixture: ComponentFixture<DynamicFormComponent<any>>;
  beforeEach(() => {
    const questionBaseStub = { dependent: { key: {}, value: {} } };
    const questionControlServiceStub = { toFormGroup: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DynamicFormComponent],
      providers: [
        { provide: QuestionBase, useValue: questionBaseStub },
        {
          provide: QuestionControlService,
          useValue: questionControlServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('questions defaults to: []', () => {
    expect(component.questions).toEqual([]);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const questionControlServiceStub: QuestionControlService = fixture.debugElement.injector.get(
        QuestionControlService
      );
      spyOn(questionControlServiceStub, 'toFormGroup');
      component.ngOnInit();
      expect(questionControlServiceStub.toFormGroup).toHaveBeenCalled();
    });
  });
});
