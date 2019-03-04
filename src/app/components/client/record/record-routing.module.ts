import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientRecordComponent } from './record.component';

const routes: Routes = [
    {
        path: '',
        component: ClientRecordComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRecordRoutingModule { }