import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignComponent } from './components/campaign/campaign.component';
import { CampaignPathMatcher, CampaignGuardService } from './components/campaign/campaign-guard.service';
import { LoginComponent } from './components/login/login.component';
import { environment } from 'src/environments/environment';
import { ClientComponent } from './components/dash/client/client.component';

const routes: Routes = [
    {
        path: 'dash',
        loadChildren: './components/dash/dash.module#DashModule'
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {admin: true}
    },
    {
        path: 'client/login',
        component: LoginComponent,
        data: { admin: false }
    },
    {
        path: '',
        loadChildren: './components/client/client.module#ClientModule'
    },
    {
        path: '', pathMatch: 'full',
        component: CampaignComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: environment.routing.tracing})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
