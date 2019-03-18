import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './campaign.component';
import { CampaignHomeComponent } from './campaign-home/campaign-home.component';
import { TosComponent } from './tos/tos.component';
import { KahaniFormsModule } from 'src/app/shared/forms/forms.module';
import { CampaignGuardService, CampaignPathMatcher } from './campaign-guard.service';


@NgModule({
    declarations: [
        CampaignComponent,
        CampaignHomeComponent,
        TosComponent
    ],
    imports: [
        CommonModule,
        KahaniFormsModule,
        CampaignRoutingModule
    ],
    providers: [
        CampaignGuardService,
        CampaignPathMatcher
    ],
    bootstrap: [CampaignComponent]
})
export class CampaignModule { }