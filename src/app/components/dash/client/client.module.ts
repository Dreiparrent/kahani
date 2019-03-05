import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import {
    MatToolbarModule, MatCardModule, MatDividerModule, MatButtonModule,
    MatListModule, MatTreeModule, MatExpansionModule, MatFormField, MatFormFieldModule, MatInputModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [ClientComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        DragDropModule,
        MatListModule,
        MatTreeModule,
        MatInputModule,
        MatFormFieldModule
    ],
    exports: [ClientComponent]
})
export class ClientModule {}
