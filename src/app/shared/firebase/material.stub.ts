import { FormGroup } from '@angular/forms';
import { Component, Input, NgModule, Directive } from '@angular/core';
import { ProgressSpinnerMode, MatDialog, MatDialogClose } from '@angular/material';
/* tslint:disable */
@Component({ selector: 'mat-card-title', template: '' })
export class MatCardTitleStubComponent {
}
@Component({ selector: 'mat-card-header', template: '' })
export class MatCardHeaderStubComponent {
}
@Component({ selector: 'mat-card-content', template: '' })
export class MatCardContentStubComponent {
}
@Component({ selector: 'mat-card', template: '' })
export class MatCardStubComponent {
}
/* tslint:enable */
@NgModule({
    declarations: [
        MatCardStubComponent,
        MatCardContentStubComponent,
        MatCardHeaderStubComponent,
        MatCardTitleStubComponent
    ],
    exports: [
        MatCardStubComponent,
        MatCardContentStubComponent,
        MatCardHeaderStubComponent,
        MatCardTitleStubComponent
    ]
})
export class MatCardStubModule { }

// ------------------------------------------------------------------------------------------------

/* tslint:disable */
@Directive({ selector: 'button[mat-icon-button]', exportAs: 'matMenuTriggerFor' })
export class MatIconButtonStubComponent {
    @Input() matMenuTriggerFor: any;
}

@Component({ selector: 'mat-button', template: '' })
export class MatButtonStubComponent {
    @Input() value: any;
    @Input() color: any;
}
@Component({ selector: 'mat-fab-button', template: '' })
export class MatFabButtonStubComponent extends MatButtonStubComponent {
    @Input() value: any;
    @Input() color: any;
}
@Directive({ selector: 'button[mat-fab]', exportAs: 'matFabButton' })
export class MatFabButtonStubDirective extends MatFabButtonStubComponent { }
@Component({ selector: 'mat-button-toggle', template: '' })
export class MatButtonToggleComponent extends MatButtonStubComponent {
    @Input() checked: boolean;
}
@Component({ selector: 'mat-button-toggle-group', template: '', exportAs: 'matButtonToggleGroup' })
export class MatButtonToggleGroupStubComponent {
    @Input() checked: boolean;
    @Input() value: any;
    @Input() vertical: boolean;
}
/* tslint:enable */
@NgModule({
    providers: [
        MatFabButtonStubDirective
    ],
    declarations: [
        MatIconButtonStubComponent,
        MatButtonStubComponent,
        MatFabButtonStubDirective,
        MatFabButtonStubComponent,
        MatButtonToggleComponent,
        MatButtonToggleGroupStubComponent
    ],
    exports: [
        MatIconButtonStubComponent,
        MatButtonStubComponent,
        MatFabButtonStubDirective,
        MatFabButtonStubComponent,
        MatButtonToggleComponent,
        MatButtonToggleGroupStubComponent
    ]
})
export class MatButtonStubModule { }

// ------------------------------------------------------------------------------------------------

/* tslint:disable */
@Component({ selector: 'mat-form-field', template: '' })
export class MatFormFieldStubComponent {
    @Input() formGroup: FormGroup;
}
@Component({ selector: 'mat-input', template: '' })
export class MatInputStubComponent {
    @Input() placeholder: string;
    @Input() id: string;
    @Input() type: string;
    @Input() formControlName: string;
    @Input() value: any;
}
@Directive({ selector: 'input[matInput]' })
export class MatInputStubDirective extends MatInputStubComponent { }
@Component({ selector: 'mat-select', template: '' })
export class MatSelectStubComponent extends MatInputStubComponent {}
@Component({ selector: 'mat-option', template: '' })
export class MatOptionStubComponent {
    @Input() value: any;
}
@Component({ selector: 'mat-error', template: '' })
export class MatErrorStubComponent extends MatInputStubComponent { }
/* tslint:enable */
@NgModule({
    providers: [
        MatInputStubDirective
    ],
    declarations: [
        MatFormFieldStubComponent,
        MatInputStubComponent,
        MatInputStubDirective,
        MatSelectStubComponent,
        MatOptionStubComponent,
        MatErrorStubComponent
    ],
    exports: [
        MatFormFieldStubComponent,
        MatInputStubComponent,
        MatInputStubDirective,
        MatSelectStubComponent,
        MatOptionStubComponent,
        MatErrorStubComponent
    ]
})
export class MatFormStubModule { }

// ------------------------------------------------------------------------------------------------

/* tslint:disable */
@Component({ selector: 'mat-expansion-panel-header', template: '' })
export class MatExpansionPanelHeaderStubComponent {
}
@Component({ selector: 'mat-expansion-panel', template: '', entryComponents: [MatExpansionPanelHeaderStubComponent] })
export class MatExpansionPannelStubComponent {
    @Input() expanded: boolean;
}
/* tslint:enable */
@NgModule({
    declarations: [
        MatExpansionPanelHeaderStubComponent,
        MatExpansionPannelStubComponent
    ],
    exports: [
        MatExpansionPanelHeaderStubComponent,
        MatExpansionPannelStubComponent
    ]
})
export class MatExpansionPanelStubModule { };

// ------------------------------------------------------------------------------------------------

/* tslint:disable */
@Component({ selector: 'mat-grid-tile', template: ''})
export class MatGridTileStubComponent {
    @Input() colspan: any;
    @Input() rowspan: any;
}
@Component({ selector: 'mat-grid-list', template: '', inputs: ['colspan'] })
export class MatGridListStubComponent {
}
/* tslint:disable */
@NgModule({
    declarations: [
        MatGridTileStubComponent,
        MatGridListStubComponent
    ],
    exports: [
        MatGridTileStubComponent,
        MatGridListStubComponent
    ]
})
export class MatGridStubModule { };

// ------------------------------------------------------------------------------------------------

/* tslint:disable */
@Component({ selector: 'mat-menu', template: '', exportAs: 'matMenu' })
export class MatMenuStubComponent {
}
@Component({ selector: 'mat-sidenav-container', template: '' })
export class MatSidenavStubComponent {
}
/* tslint:enable */
@NgModule({
    declarations: [
        MatMenuStubComponent,
        MatSidenavStubComponent
    ],
    exports: [
        MatMenuStubComponent,
        MatSidenavStubComponent
    ]
})
export class MatMenuStubModule { };

// ------------------------------------------------------------------------------------------------

/* tslint:disable */
@Directive({ selector: 'mat-dialog', exportAs: 'matDialog' })
export class MatDialogStubDirective {
}
export class MatDialogRefStub<T> {
    componentInstance: T;
    disableClose: boolean | undefined;
    id: string
}
@Directive({ selector: 'button[mat-dialog-close]', exportAs: 'matDialogClose' })
export class MatDialogCloseStubComponent {
    @Input('aria-label') ariaLabel: string;
    @Input('mat-dialog-close') dialogResult: any;
    dialogRef: MatDialogRefStub<any>;
}
/* tslint:enable */
@NgModule({
    providers: [
        { provide: MatDialog, useClass: MatDialogStubDirective },
        { provide: MatDialogClose, useClass: MatDialogCloseStubComponent },
    ],
    declarations: [
        MatDialogStubDirective,
        MatDialogCloseStubComponent
    ],
    exports: [
        MatDialogStubDirective,
        MatDialogCloseStubComponent
    ]
})
export class MatDialogStubModule { };

// ------------------------------------------------------------------------------------------------

/* tslint:disable */
@Component({ selector: 'mat-tooltop', template: '' })
export class StubMatTooltipModule {
}
@Component({ selector: 'mat-icon', template: '' })
export class MatIconStubComponent {
}
@Component({ selector: 'mat-action-list', template: '' })
export class MatListStubComponent {
}
@Component({ selector: 'mat-divider', template: '' })
export class MatDividerStubComponent {
}
@Component({ selector: 'mat-progress-spinner', template: '' })
export class MatProgressSpinnerStubComponent {
    @Input() mode: ProgressSpinnerMode;
    @Input() value: number;
}
/* tslint:enable */
@NgModule({
    imports: [
        MatCardStubModule,
        MatButtonStubModule,
        MatFormStubModule,
        MatExpansionPanelStubModule,
        MatGridStubModule,
        MatMenuStubModule,
        MatDialogStubModule
    ],
    declarations: [
        StubMatTooltipModule,
        MatIconStubComponent,
        MatListStubComponent,
        MatDividerStubComponent,
        MatProgressSpinnerStubComponent
    ],
    exports: [
        MatCardStubModule,
        MatButtonStubModule,
        MatFormStubModule,
        MatExpansionPanelStubModule,
        MatGridStubModule,
        MatMenuStubModule,
        MatDialogStubModule,
        StubMatTooltipModule,
        MatIconStubComponent,
        MatListStubComponent,
        MatDividerStubComponent,
        MatProgressSpinnerStubComponent
    ]
})
export class MaterialStubModule { }