import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { TosComponent } from './tos/tos.component';
import { KahaniFormsModule } from 'src/app/shared/forms/forms.module';


@NgModule({
    declarations: [
        ClientComponent,
        ClientHomeComponent,
        TosComponent
    ],
    imports: [
        CommonModule,
        KahaniFormsModule,
        ClientRoutingModule
    ],
    bootstrap: [ClientComponent]
})
export class ClientModule { }