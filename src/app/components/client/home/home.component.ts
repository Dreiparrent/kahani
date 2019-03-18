import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { Campaign } from 'src/app/shared/firebase/constatnts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    responses = new BehaviorSubject<{ question: string, link: string }[]>([]);

    constructor(private firebase: FirebaseService) { }

    ngOnInit() {
        this.setClient();
    }

    async setClient() {
        const campaign = await this.firebase.getUrl('link');
        this.firebase.campaign = new Campaign(campaign);
        this.firebase.campaign.questions.forEach(q => {
            const resp = this.responses.getValue();
            q.ref.get().then(value => {
                resp.push({ question: value.data()['question'], link: q.ref.id });
            });
        });
    }

}
