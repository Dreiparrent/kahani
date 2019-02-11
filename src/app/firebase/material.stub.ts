import { Component, Input, NgModule, Injectable, Directive } from '@angular/core';
import { ProgressSpinnerMode, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material';
/* tslint:disable */
@Component({ selector: 'mat-icon', template: '' })
export class StubMatIconModule {
}
@Component({ selector: 'mat-action-list', template: '' })
export class StubMatListModule {
}
@Component({ selector: 'mat-divider', template: '' })
export class StubMatDividerModule {
}
@Component({ selector: 'mat-progress-spinner', template: '' })
export class StubMatProgressSpinnerModule {
    @Input() mode: ProgressSpinnerMode;
    @Input() value: number;
}
@Component({ selector: 'mat-card-title', template: '' })
export class StubMatCardTitle {
}
@Component({ selector: 'mat-card-header', template: '' })
export class StubMatCardHeader {
}
@Component({ selector: 'mat-card-content', template: '' })
export class StubMatCardContent {
}
@Component({ selector: 'mat-card', template: '' })
export class StubMatCardModule {
}
@Directive({ selector: 'mat-dialog', exportAs: 'matDialog'})
export class StubMatDialogModule {
}
export class StubMatDialogRef<T> {
    componentInstance: T;
    disableClose: boolean | undefined;
    id: string
}
@Directive({ selector: 'button[mat-icon-button]', exportAs: 'matMenuTriggerFor' })
export class StubMatIconButton {
    @Input() matMenuTriggerFor: any;
}
@Directive({ selector: 'button[mat-dialog-close]', exportAs: 'matDialogClose' })
export class StubMatDialogClose {
    @Input('aria-label') ariaLabel: string;
    @Input('mat-dialog-close') dialogResult: any;
    dialogRef: StubMatDialogRef<any>;
}
@Component({ selector: 'mat-button', template: '' })
export class StubMatButtonModule {
    @Input() value: any;
}
@Component({ selector: 'mat-button-toggle', template: '' })
export class StubMatButtonToggleModule extends StubMatButtonModule {
    @Input() checked: boolean;
}
@Component({ selector: 'mat-button-toggle-group', template: '', exportAs: 'matButtonToggleGroup' })
export class StubMatButtonToggleGroupModule {
    @Input() checked: boolean;
    @Input() value: any;
    @Input() vertical: boolean;
}
@Component({ selector: 'mat-tooltop', template: '' })
export class StubMatTooltipModule {
}
@Component({ selector: 'mat-form-field', template: '' })
export class StubMatFormFieldModule {
}
@Component({ selector: 'mat-input', template: '' })
export class StubMatInputModule {
}
@Component({ selector: 'mat-expansion-panel-header', template: '' })
export class StubMatExpansionHeader {
}
@Component({ selector: 'mat-expansion-panel', template: '', entryComponents: [StubMatExpansionHeader] })
export class StubMatExpansionModule {
    @Input() expanded: boolean;
}
@Component({ selector: 'mat-grid-tile', template: ''})
export class StubMatGridTile {
    @Input() colspan: any;
    @Input() rowspan: any;
}
@Component({ selector: 'mat-grid-list', template: '', inputs: ['colspan'] })
export class StubMatGridListModule {
}
@Component({ selector: 'mat-menu', template: '', exportAs: 'matMenu' })
export class StubMatMenuModule {
}
@Component({ selector: 'mat-sidenav-container', template: '' })
export class StubMatSidenavModule {
}

/* tslint:enable */
@NgModule({
    providers: [
        { provide: MatDialog, useClass: StubMatDialogModule },
        { provide: MatDialogClose, useClass: StubMatDialogClose },
    ],
    declarations: [
        StubMatIconModule,
        StubMatListModule,
        StubMatDividerModule,
        StubMatProgressSpinnerModule,
        StubMatCardHeader,
        StubMatCardTitle,
        StubMatCardContent,
        StubMatCardModule,
        StubMatIconButton,
        StubMatButtonModule,
        StubMatButtonToggleModule,
        StubMatButtonToggleGroupModule,
        StubMatTooltipModule,
        StubMatFormFieldModule,
        StubMatInputModule,
        StubMatExpansionHeader,
        StubMatExpansionModule,
        StubMatDialogModule,
        StubMatDialogClose,
        StubMatGridTile,
        StubMatGridListModule,
        StubMatMenuModule,
        StubMatSidenavModule
    ],
    exports: [
        StubMatIconModule,
        StubMatListModule,
        StubMatDividerModule,
        StubMatProgressSpinnerModule,
        StubMatCardHeader,
        StubMatCardTitle,
        StubMatCardContent,
        StubMatCardModule,
        StubMatDialogModule,
        StubMatIconButton,
        StubMatButtonModule,
        StubMatButtonToggleModule,
        StubMatButtonToggleGroupModule,
        StubMatTooltipModule,
        StubMatFormFieldModule,
        StubMatInputModule,
        StubMatExpansionHeader,
        StubMatExpansionModule,
        StubMatDialogModule,
        StubMatDialogClose,
        StubMatGridTile,
        StubMatGridListModule,
        StubMatMenuModule,
        StubMatSidenavModule,
    ]
})
export class StubMaterialModule { }