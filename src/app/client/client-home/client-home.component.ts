import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClientConfig } from 'src/app/firebase/constatnts';
import { FirebaseService } from 'src/app/firebase/firebase.service';

@Component({
    selector: 'app-client-home',
    templateUrl: './client-home.component.html',
    styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit, OnDestroy {

    @ViewChild('bgVideo') bgVideo: ElementRef<HTMLVideoElement>;
    public client: ClientConfig;

    public TOS = environment.tosAccept;

    constructor(private firebaseService: FirebaseService) {
        this.client = firebaseService.testClientConfig;
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