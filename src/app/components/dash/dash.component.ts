import { Component, OnInit, ViewChild } from '@angular/core';
import { Campaign } from 'src/app/shared/firebase/constatnts';
import { MatDrawer } from '@angular/material';
import { environment } from 'src/environments/environment';
import { SidenavService } from 'src/app/layouts/sidenav/sidenav.service';

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
    details: Campaign = null;
    opened = environment.dash.openCampaign;
    @ViewChild('campaign') campaign: MatDrawer;
    constructor(private sidenav: SidenavService) {
        this.details = environment.dash.campaign ? new Campaign(environment.dash.campaign) : null;
    }

    ngOnInit() { }

    showDetails(details: Campaign) {
        this.details = details;
        this.campaign.toggle();
    }
    toggle() {
        // console.log('toggle');
        this.sidenav.sidenav.toggle();
    }
}
