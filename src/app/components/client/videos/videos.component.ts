import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { QuerySnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
    videos = new BehaviorSubject<IResponse[]>([]);
    constructor(private firebase: FirebaseService) {
    }

    ngOnInit() {
        this.firebase.videos.onSnapshot((snapshot: QuerySnapshot<IResponse>) => {
            snapshot.forEach(document => {
                if (document.exists) {
                    this.firebase.getVideoRef(document.id).then(link => {
                        const update = this.videos.getValue();
                        update.push(Object.assign({link: link}, document.data()) as IResponse);
                        this.videos.next(update);
                    })
                }
            });
        });
    }

    getVals(val: { [key: string]: any }): string[] {
        const obj: string[] = [];
        const keys = Object.keys(val);
        Object.values(val).forEach((v, i) => {
            obj.push(keys[i] + ': ' + v);
            // obj[keys[i]] = val;
        });
        return obj;
    }
    getKeys(val: { [key: string]: any }) {
        return Object.keys(val);
    }

}
interface IResponse {
    userQuestions: { [key: string]: any },
    extraQuestions: { [key: string]: any },
    time: number;
    link: string;
}