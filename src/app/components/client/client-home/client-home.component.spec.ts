import { AngularFireStorage } from '@angular/fire/storage';
import { MaterialStubModule } from './../../firebase/material.stub';
import { QuestionComponent } from './../client-record/question/question.component';
// import { firebase, mockAngularFireStorage } from './../../firebase/firebase.service.spy';
import { FirebaseService } from './../../firebase/firebase.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHomeComponent } from './client-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { mockFirebase, mockAngularFireStorage } from 'src/app/firebase/firebase.service.spy';

describe('ClientHomeComponent', () => {
    let component: ClientHomeComponent;
    let fixture: ComponentFixture<ClientHomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ClientHomeComponent,
                QuestionComponent
            ],
            imports: [
                RouterTestingModule,
                FormsModule,
                MaterialStubModule
            ],
            providers: [
                { provide: FirebaseService, useValue: mockFirebase },
                { provide: AngularFireStorage, useValue: mockAngularFireStorage }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClientHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
