import { Component, OnInit, ViewChild } from '@angular/core';
import { Campaign } from 'src/app/shared/firebase/constatnts';
import { MatDrawer } from '@angular/material';
import { environment } from 'src/environments/environment';
import { SidenavService } from 'src/app/layouts/sidenav/sidenav.service';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
    details = new Subject<Campaign>();
    opened = environment.dash.openCampaign;
    @ViewChild('campaign') campaign: MatDrawer;
    constructor(private fireabse: FirebaseService, private sidenav: SidenavService) {
        // fireabse.getClient('0').then(client => {
        //     this.details = cli
        // })
        //  this.details = environment.dash.campaign ? new Campaign(environment.dash.campaign) : null;
    }

    ngOnInit() {
        // this.fireabse.getClient('0').then(client => {

        // })
    }

    showDetails(details: Campaign) {
        this.details.next(details);
        this.campaign.toggle();
    }
    toggle() {
        // console.log('toggle');
        this.sidenav.sidenav.toggle();
    }
}
