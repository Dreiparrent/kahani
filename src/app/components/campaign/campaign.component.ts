import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
    styleUrls: ['./campaign.component.scss'],
    animations: [
        slideInAnimation
  ]
})
export class CampaignComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
