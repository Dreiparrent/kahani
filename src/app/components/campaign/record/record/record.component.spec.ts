import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { ResizeService } from 'src/app/shared/resize/resize.service';
import { ClientRecorderComponent } from './record.component';
describe('ClientRecorderComponent', () => {
  let component: ClientRecorderComponent;
  let fixture: ComponentFixture<ClientRecorderComponent>;
  beforeEach(() => {
    const firebaseServiceStub = {};
    const resizeServiceStub = {};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ClientRecorderComponent],
      providers: [
        { provide: FirebaseService, useValue: firebaseServiceStub },
        { provide: ResizeService, useValue: resizeServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ClientRecorderComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('buttonColor defaults to: black', () => {
    expect(component.buttonColor).toEqual('black');
  });
});
