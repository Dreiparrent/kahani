import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    animations: [
        slideInAnimation
  ]
})
export class ClientComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
