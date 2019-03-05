import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRecorderComponent } from './record/record.component';
import { ClientQuestionComponent } from './question/question.component';
import { ClientPrerecordComponent } from './prerecord/prerecord.component';
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
    MatExpansionModule
} from '@angular/material';
import { ClientRecordComponent } from './record.component';
import { KahaniFormsModule } from 'src/app/shared/forms/forms.module';
import { ClientRecordRoutingModule } from './record-routing.module';
@NgModule({
    declarations: [
        ClientRecordComponent,
        ClientRecorderComponent,
        ClientQuestionComponent,
        ClientPrerecordComponent
    ],
    imports: [
        CommonModule,
        ClientRecordRoutingModule,
        WebcamModule,
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
    entryComponents: [ClientPrerecordComponent]
})
export class ClientRecordModule {}
