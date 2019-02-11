import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordComponent } from './record.component';
import { StubMaterialModule } from 'src/app/firebase/material.stub';
import { FirebaseService } from 'src/app/firebase/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { mockFirebase, mockAngularFireStorage } from 'src/app/firebase/firebase.service.spy';

describe('RecordComponent', () => {
    let component: RecordComponent;
    let fixture: ComponentFixture<RecordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecordComponent],
            imports: [StubMaterialModule],
            providers: [
                { provide: FirebaseService, useValue: mockFirebase },
                { provide: AngularFireStorage, useValue: mockAngularFireStorage }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
