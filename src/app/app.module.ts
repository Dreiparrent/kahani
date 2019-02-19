import { KahaniFormsModule } from './shared/forms/forms.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { TestDashComponent } from './test-dash/test-dash.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatSidenavModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ClientModule } from './client/client.module';
import { FirebaseService } from './firebase/firebase.service';
import { ResizeService } from './resize/resize.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { VersionComponent } from './version/version.component';

@NgModule({
    declarations: [
        AppComponent,
        TestDashComponent,
        VersionComponent
    ],
    imports: [
        ClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule,
        MatSidenavModule,
        KahaniFormsModule
    ],
    providers: [
        FirebaseService,
        ResizeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }