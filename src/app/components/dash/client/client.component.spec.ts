import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { Campaign } from 'src/app/shared/firebase/constatnts';
import { IClientNote } from 'src/app/shared/firebase/constatnts';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ContentType } from 'src/app/shared/firebase/constatnts';
import { ClientComponent } from './client.component';
describe('ClientDashComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  beforeEach(() => {
    const firebaseServiceStub = { client: {} };
    const campaignStub = {};
    const iClientNoteStub = {
      details: { note: {}, splice: () => ({}), level: {} }
    };
    const cdkDragDropStub = {
      previousIndex: {},
      currentIndex: {},
      previousContainer: { data: {} },
      container: { data: {} }
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ClientComponent],
      providers: [
        { provide: FirebaseService, useValue: firebaseServiceStub },
        { provide: Campaign, useValue: campaignStub },
        // { provide: IClientNote, useValue: iClientNoteStub },
        // { provide: CdkDragDrop, useValue: cdkDragDropStub }
      ]
    });
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('contentType defaults to: ContentType', () => {
    expect(component.contentType).toEqual(ContentType);
  });
});
