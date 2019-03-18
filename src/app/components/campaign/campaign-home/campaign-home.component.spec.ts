import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { ContentType } from 'src/app/shared/firebase/constatnts';
import { ClientHomeComponent } from './client-home.component';
import { environment } from 'src/environments/environment';
describe('ClientHomeComponent', () => {
    let component: ClientHomeComponent;
    let fixture: ComponentFixture<ClientHomeComponent>;
    beforeEach(() => {
        const firebaseServiceStub = { campaign: {} };
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ClientHomeComponent],
            providers: [{ provide: FirebaseService, useValue: firebaseServiceStub }]
        });
        fixture = TestBed.createComponent(ClientHomeComponent);
        component = fixture.componentInstance;
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
    it('TOS defaults to: environment.tosAccept', () => {
        expect(component.TOS).toEqual(environment.tosAccept);
    });
    it('contentTypes defaults to: ContentType', () => {
        expect(component.contentTypes).toEqual(ContentType);
    });
});