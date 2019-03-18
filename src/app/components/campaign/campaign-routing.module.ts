import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignHomeComponent } from './campaign-home/campaign-home.component';
import { CampaignComponent } from './campaign.component';
import { TosComponent } from './tos/tos.component';
import { CampaignGuardService, CampaignPathMatcher } from './campaign-guard.service';

const routes: Routes = [
    {
        // path: '',
        component: CampaignComponent,
        matcher: CampaignPathMatcher.pathMatcher,
        canActivate: [CampaignGuardService],
        children: [
            {
                path: 'record',
                loadChildren: './record/record.module#ClientRecordModule',
                data: { animation: 'RecordPage' }
            },
            {
                path: 'tos',
                component: TosComponent,
                data: { animation: 'TosPage' }
            },
            {
                path: '',
                component: CampaignHomeComponent,
                data: { animation: 'HomePage' }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
