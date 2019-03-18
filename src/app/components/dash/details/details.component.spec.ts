import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DashDetailsComponent } from './details.component';
import { environment } from 'src/environments/environment';
describe('DashDetailsComponent', () => {
    let component: DashDetailsComponent;
    let fixture: ComponentFixture<DashDetailsComponent>;
    beforeEach(() => {
        const cdkDragDropStub = { previousIndex: {}, currentIndex: {} };
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [DashDetailsComponent],
            // providers: [{ provide: CdkDragDrop, useValue: cdkDragDropStub }]
        });
        fixture = TestBed.createComponent(DashDetailsComponent);
        component = fixture.componentInstance;
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
    it('themes defaults to: []', () => {
        expect(component.themes).toEqual([]);
    });
    it('details defaults to: []', () => {
        expect(component.details).toEqual([]);
    });
    it('openAll defaults to: environment.dash.openAll', () => {
        expect(component.openAll).toEqual(environment.dash.openAll);
    });
});
