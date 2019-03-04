import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <mat-sidenav-container class="mat-typography">
            <app-version *ngIf="showVersion" ></app-version>
            <router-outlet></router-outlet>
        </mat-sidenav-container>
    `,
    styles: [
        `app-version {
            position: absolute;
            width: 100px;
            bottom: 0;
            left: 0;
        }`
    ]
})
export class AppComponent {
    title = 'kahani';
    showVersion = environment.version.includeVersion;
}
