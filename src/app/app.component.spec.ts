import {
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule
} from '@angular/material';
import { FirebaseService } from 'src/app/firebase/firebase.service';
import { ResizeService } from 'src/app/resize/resize.service';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialStubModule } from './firebase/material.stub';
import { Component } from '@angular/core';

/* tslint:disable*/
@Component({ selector: 'app-test-dash', template: '' })
class TestDashStubComponent { }
@Component({ selector: 'app-version', template: '' })
class VersionStubComponent {}
/* tslint:enable*/
describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                BrowserAnimationsModule,
                MaterialStubModule
            ],
            declarations: [AppComponent, TestDashStubComponent, VersionStubComponent],
            providers: [FirebaseService, ResizeService]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'kahani'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('kahani');
    });

    // it('should render title in a h1 tag', () => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector('h1').textContent).toContain(
    //         'Welcome to kahani!'
    //     );
    // });
});
