import { DashModule } from './components/dash/dash.module';
import { KahaniFormsModule } from './shared/forms/forms.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatSidenavModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ClientModule } from './components/client/client.module';
import { FirebaseService } from './shared/firebase/firebase.service';
import { ResizeService } from './shared/resize/resize.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { VersionComponent } from './components/version/version.component';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';
import { SidenavService } from './layouts/sidenav/sidenav.service';

@NgModule({
    declarations: [
        AppComponent,
        VersionComponent,
        SidenavComponent
    ],
    imports: [
        ClientModule,
        DashModule,
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
        KahaniFormsModule,
    ],
    providers: [
        FirebaseService,
        ResizeService,
        SidenavService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }