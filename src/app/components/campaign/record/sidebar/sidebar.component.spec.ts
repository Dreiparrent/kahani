import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { ClientSidebarComponent } from './sidebar.component';
import { environment } from 'src/environments/environment';
describe('ClientSidebarComponent', () => {
    let component: ClientSidebarComponent;
    let fixture: ComponentFixture<ClientSidebarComponent>;
    const expectedQuestions = environment.campaignConfig._campaigns[0].questions.map(q => q.text);
    beforeEach(() => {
        const firebaseServiceStub = {
            campaign: {
                questions: environment.campaignConfig._campaigns[0].questions,
                name: environment.campaignConfig._campaigns[0].name
            }
        };
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ClientSidebarComponent],
            providers: [
                { provide: FirebaseService, useValue: firebaseServiceStub }
            ]
        });
        fixture = TestBed.createComponent(ClientSidebarComponent);
        component = fixture.componentInstance;
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
    it('questions defaults to: environement questions', () => {
        expect(component.questions).toEqual(expectedQuestions);
    });
    it('name defaults to: environment campaing name', () => {
        expect(component.name).toEqual(environment.campaignConfig._campaigns[0].name);
    });
});
