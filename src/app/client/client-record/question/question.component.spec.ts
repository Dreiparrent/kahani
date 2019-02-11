import { mockAngularFireStorage } from './../../../firebase/firebase.service.spy';
import { AngularFireStorage } from '@angular/fire/storage';
import { mockFirebase } from 'src/app/firebase/firebase.service.spy';
import { FirebaseService } from 'src/app/firebase/firebase.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { StubMaterialModule } from 'src/app/firebase/material.stub';

describe('QuestionComponent', () => {
    let component: QuestionComponent;
    let fixture: ComponentFixture<QuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuestionComponent],
            imports: [StubMaterialModule],
            providers: [
                { provide: FirebaseService, useValue: mockFirebase },
                { provide: AngularFireStorage, useValue: mockAngularFireStorage }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
