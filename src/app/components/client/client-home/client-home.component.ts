import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Campaign, ContentType } from 'src/app/shared/firebase/constatnts';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';

@Component({
    selector: 'app-client-home',
    templateUrl: './client-home.component.html',
    styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit, OnDestroy {

    @ViewChild('bgVideo') bgVideo: ElementRef<HTMLVideoElement>;
    public client: Campaign;

    public TOS = environment.tosAccept;
    public contentTypes = ContentType;

    constructor(private firebase: FirebaseService) {
        this.client = firebase.campaign;
    }

    ngOnInit() {
        this.bgVideo.nativeElement.muted = true;
        setTimeout(() => {
            this.bgVideo.nativeElement.play().catch(error => {
                console.error(error);
            });
        }, 2000);
    }

    ngOnDestroy(): void {
        this.bgVideo.nativeElement.pause();
    }

}