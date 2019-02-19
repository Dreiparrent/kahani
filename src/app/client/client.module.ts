import { KahaniFormsModule } from './../shared/forms/forms.module';
import { DynamicFormComponent } from './../shared/forms/dynamic-form/dynamic-form.component';
import { FormsModule } from '@angular/forms';
import {
    MatIconModule, MatDividerModule, MatListModule,
    MatProgressSpinnerModule, MatCardModule, MatDialogModule,
    MatButtonModule, MatButtonToggleModule, MatTooltipModule,
    MatInputModule, MatFormFieldModule, MatExpansionModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientRecordComponent } from './client-record/client-record.component';
import { TosComponent } from './tos/tos.component';
import { WebcamModule } from 'ngx-webcam';
import { RecordComponent } from './client-record/record/record.component';
import { QuestionComponent } from './client-record/question/question.component';
import { PrerecordComponent } from './client-record/prerecord/prerecord.component';

@NgModule({
    declarations: [
        ClientComponent,
        ClientHomeComponent,
        ClientRecordComponent,
        TosComponent,
        RecordComponent,
        QuestionComponent,
        PrerecordComponent
    ],
    imports: [
        ClientRoutingModule,
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
    entryComponents: [PrerecordComponent],
    bootstrap: [ClientComponent]
})
export class ClientModule { }