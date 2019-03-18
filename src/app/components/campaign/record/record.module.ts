import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignRecorderComponent } from './record/record.component';
import { CampaignSidebarComponent } from './sidebar/sidebar.component';
import { CampaignPrerecordComponent } from './prerecord/prerecord.component';
import { WebcamModule } from 'ngx-webcam';
import {
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatExpansionModule,
    MatSliderModule
} from '@angular/material';
import { ClientRecordComponent } from './record.component';
import { KahaniFormsModule } from 'src/app/shared/forms/forms.module';
import { ClientRecordRoutingModule } from './record-routing.module';
@NgModule({
    declarations: [
        ClientRecordComponent,
        CampaignRecorderComponent,
        CampaignSidebarComponent,
        CampaignPrerecordComponent
    ],
    imports: [
        CommonModule,
        ClientRecordRoutingModule,
        WebcamModule,
        MatSliderModule,
        MatIconModule,
        MatListModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatTooltipModule,
        MatExpansionModule,
        KahaniFormsModule
    ],
    exports: [ClientRecordComponent],
    entryComponents: [CampaignPrerecordComponent]
})
export class ClientRecordModule {}
