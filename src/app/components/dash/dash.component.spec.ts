import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Campaign } from 'src/app/shared/firebase/constatnts';
import { SidenavService } from 'src/app/layouts/sidenav/sidenav.service';
import { DashComponent } from './dash.component';
import { environment } from 'src/environments/environment';
describe('DashComponent', () => {
    let component: DashComponent;
    let fixture: ComponentFixture<DashComponent>;
    beforeEach(() => {
        const campaignStub = {};
        const sidenavServiceStub = { sidenav: { toggle: () => ({}) } };
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [DashComponent],
            providers: [
                { provide: Campaign, useValue: campaignStub },
                { provide: SidenavService, useValue: sidenavServiceStub }
            ]
        });
        fixture = TestBed.createComponent(DashComponent);
        component = fixture.componentInstance;
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
    it('opened defaults to: environment.dash.openCampaign', () => {
        expect(component.opened).toEqual(environment.dash.openCampaign);
    });
});
