import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientGuardService, ClientPathMatcher, VideoGuardService } from './client-guard.service';
import { MatToolbarModule, MatCardModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { VideosComponent } from './videos/videos.component';

@NgModule({
    declarations: [ClientComponent, HomeComponent, VideosComponent],
    imports: [
        CommonModule,
        ClientRoutingModule,
        MatCardModule,
        MatToolbarModule
    ],
    providers: [ClientGuardService, VideoGuardService, ClientPathMatcher]
})
export class ClientModule {}
