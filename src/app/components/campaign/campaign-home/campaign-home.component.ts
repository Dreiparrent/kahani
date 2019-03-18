import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Campaign, ContentType } from 'src/app/shared/firebase/constatnts';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-campaign-home',
    templateUrl: './campaign-home.component.html',
    styleUrls: ['./campaign-home.component.scss']
})
export class CampaignHomeComponent implements OnInit, OnDestroy {
    @ViewChild('bgVideo') bgVideo: ElementRef<HTMLVideoElement>;
    public campaign: Campaign;
    public TOS = environment.tosAccept;
    public contentTypes = ContentType;

    constructor(private firebase: FirebaseService) {
        this.campaign = firebase.campaign;
        // TODO: use other service here for instant load
        // console.log(this.firebase.client);
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