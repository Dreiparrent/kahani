import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { Component, OnInit, HostListener, AfterViewChecked, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { IBaseUserData } from 'src/app/shared/firebase/constatnts';

@Component({
    selector: 'app-campaign-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class CampaignSidebarComponent implements OnInit {
    @Input() userData: {};
    @Input() question = '';
    public get userAnswers() {
        return Object.values(this.userData);
    }
    @ViewChild('outer') outer: ElementRef<HTMLDivElement>;
    @ViewChild('overlayButton') overlayButton: ElementRef<HTMLButtonElement>;
    name: string;
    @Output() details: EventEmitter<boolean> = new EventEmitter();

    get shouldOverlay() {
        return this.outer.nativeElement.clientWidth < 250;
    }
    private _isOverlay = false;
    get isOverlay() {
        return this._isOverlay;
    }
    set isOverlay(over: boolean) {
        // this.outer.nativeElement.style.display = over ? 'none' : 'block';
        // this.outer.nativeElement.style.position = over ? 'absolute' : 'relative';
        // this.overlayButton.nativeElement.style.display = over ? 'none' : 'none';
        this._isOverlay = over;
    }
    public isPopout = false;
    constructor(private firebase: FirebaseService) {
        // this.name = firebase.campaign.name;
        // TODO: this
    }

    ngOnInit() {}
    getStyle() {
        const primary = this.firebase.campaign.primary.backgroundColor;
        const accent = this.firebase.campaign.accent.backgroundColor;
        return `linear-gradient(0, ${primary}, ${accent})`;
    }
    public changeDetails() {
        this.details.next(true);
    }
}
