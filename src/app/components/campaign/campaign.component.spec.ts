import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
// import { RouterOutlet,  } from '@angular/router';
import { ClientComponent } from './client.component';
import { MaterialStubModule } from 'src/app/shared/firebase/material.stub';
describe('ClientComponent', () => {
    let component: ClientComponent;
    let fixture: ComponentFixture<ClientComponent>;
    beforeEach(() => {
        const routerOutletStub = { activatedRouteData: {} };
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ClientComponent],
            imports: [MaterialStubModule, RouterTestingModule],
            // providers: [{ provide: RouterOutlet, useValue: routerOutletStub }]
        });
        fixture = TestBed.createComponent(ClientComponent);
        component = fixture.componentInstance;
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
});
