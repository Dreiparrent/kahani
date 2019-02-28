import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRecordComponent } from './client-record.component';

import { Component, Input, NgModule } from '@angular/core';
import { MaterialStubModule } from 'src/app/firebase/material.stub';
import { FirebaseService } from 'src/app/firebase/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import {
    mockFirebase,
    mockAngularFireStorage
} from 'src/app/firebase/firebase.service.spy';
/* tslint:disable */
@Component({ selector: 'app-client-question', template: '' })
class QeustionStubComponent {
    @Input('') userData: any;
}
/* tslint:enable */

describe('ClientRecordComponent', () => {
    let component: ClientRecordComponent;
    let fixture: ComponentFixture<ClientRecordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClientRecordComponent, QeustionStubComponent],
            imports: [MaterialStubModule],
            providers: [
                { provide: FirebaseService, useValue: mockFirebase },
                {
                    provide: AngularFireStorage,
                    useValue: mockAngularFireStorage
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClientRecordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
