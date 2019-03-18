import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientPathMatcher, ClientGuardService, VideoGuardService } from './client-guard.service';
import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
    {
        matcher: ClientPathMatcher.pathMatcher,
        canActivate: [ClientGuardService],
        component: ClientComponent,
        children: [
            {
                matcher: ClientPathMatcher.videoMatcher,
                canActivate: [VideoGuardService],
                component: VideosComponent
            },
            {
                path: '',
                component: HomeComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
