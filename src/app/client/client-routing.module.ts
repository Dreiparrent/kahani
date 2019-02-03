import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientComponent } from './client.component';
import { ClientRecordComponent } from './client-record/client-record.component';
import { TosComponent } from './tos/tos.component';

const routes: Routes = [
    {
        path: '', component: ClientComponent,
        children: [
            {
                path: 'record',
                component: ClientRecordComponent,
                data: {animation: 'RecordPage'}
            },
            {
                path: 'tos',
                component: TosComponent,
                data: {animation: 'TosPage'}
            },
            {
                path: '',
                component: ClientHomeComponent,
                data: { animation: 'HomePage' }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
