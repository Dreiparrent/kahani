import { FirebaseService } from './../../../firebase/firebase.service';
import { Component, OnInit, HostListener, AfterViewChecked, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
    @ViewChild('outer') outer: ElementRef<HTMLDivElement>;
    questions: string[] = [];
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
        this._isOverlay = over;
    }

    constructor(private firebase: FirebaseService) {
        this.questions = firebase.testClientConfig.questions.map(q => q.text);
    }

    ngOnInit() {}
    // ngAfterViewChecked(): void {
    //     // this.overlayQ = this.outer.nativeElement.offsetWidth < 250;
    //     if (this.overlayQ !== this.outer.nativeElement.offsetWidth < 250)
    //         this.overlayQ = !this.overlayQ;
    // }
    public changeDetails() {
        this.details.next(true);
    }
}
