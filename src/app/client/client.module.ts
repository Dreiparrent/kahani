import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientRecordComponent } from './client-record/client-record.component';
import { FormsModule } from '@angular/forms';
import { TosComponent } from './tos/tos.component';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
    declarations: [ClientComponent, ClientHomeComponent, ClientRecordComponent, TosComponent],
    imports: [
        CommonModule,
        ClientRoutingModule,
        FormsModule,
        WebcamModule
    ],
    bootstrap: [ClientComponent]
})
export class ClientModule { }
