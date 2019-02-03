import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestDashComponent } from './test-dash/test-dash.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
    {
        path: '**',
        component: ClientComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
