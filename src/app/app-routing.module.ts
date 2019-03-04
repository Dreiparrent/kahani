import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './components/client/client.component';

const routes: Routes = [
    {
        path: 'dash',
        loadChildren: './components/dash/dash.module#DashModule'
    },
    {
        path: '',
        component: ClientComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
