import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    template: `<section><h1>awaiting login<br>(you may need to allow popups)</h1></section>`,
    styles: [
        `
        section {
            text-align: center !important;
        }
        h1 {
            width: 100vw;
            height: 100vh;
            vertical-align: 50% !important;
        }`
    ]
})
export class LoginComponent {
    constructor(private firebase: FirebaseService, private route: ActivatedRoute, private router: Router) {
        const needAuth = route.snapshot.data['admin'] as boolean;
        const client = '0';
        this.firebase.getAuth(needAuth).then(auth => {
            console.log(auth);
            if (auth) {
                if (needAuth)
                    router.navigate(['/dash']);
                else
                    router.navigate(['/client/' + client]);
            }
        });
    }
}