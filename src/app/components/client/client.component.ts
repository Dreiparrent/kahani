import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

    get primary() {
        return this.fireabse.campaign.primary.style;
    }
    get accent() {
        return this.fireabse.campaign.accent.size;
    }

    constructor(private fireabse: FirebaseService) {

    }

    ngOnInit() {
    }

}
