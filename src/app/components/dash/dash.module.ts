import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash.component';
import { DashSidenavComponent } from './sidenav/sidenav.component';
import {
    MatSidenavModule, MatButtonModule, MatToolbarModule,
    MatDividerModule, MatCardModule, MatExpansionModule, MatInputModule, MatTabsModule
} from '@angular/material';
import { ClientModule } from './client/client.module';
import { DashDetailsComponent } from './details/details.component';
import { KahaniFormsModule } from 'src/app/shared/forms/forms.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashRoutingModule } from './dash-routing.module';
import { SidenavComponent } from 'src/app/layouts/sidenav/sidenav.component';
import { SidenavService } from 'src/app/layouts/sidenav/sidenav.service';
import { DashGuardService } from './dash-guard.service';

@NgModule({
  declarations: [SidenavComponent, DashComponent, DashSidenavComponent, DashDetailsComponent],
    imports: [
      DashRoutingModule,
      CommonModule,
      MatToolbarModule,
      MatSidenavModule,
      MatButtonModule,
      ClientModule,
      DragDropModule,
      MatDividerModule,
      KahaniFormsModule,
      MatCardModule,
      MatInputModule,
      MatExpansionModule,
      MatTabsModule
    ],
    providers: [
        DashGuardService,
        SidenavService
    ]
})
export class DashModule { }