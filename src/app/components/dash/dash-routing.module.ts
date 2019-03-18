import { DashComponent } from './dash.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { DashSidenavComponent } from './sidenav/sidenav.component';
import { DashGuardService } from './dash-guard.service';

const routes: Routes = [
    {
        path: '',
        component: SidenavComponent,
        canActivate: [DashGuardService],
        children: [
            {
                path: '',
                outlet: 'nav',
                component: DashSidenavComponent
            },
            {
                path: '',
                component: DashComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
