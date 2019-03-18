import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';

@Injectable()
export class DashGuardService implements CanActivate {
    isAuth: boolean;
    constructor(private firebase: FirebaseService, private router: Router) {
        this.firebase.user.subscribe(user => {
            if (user) {
                this.router.navigate(['/dash']);
                this.isAuth = true;
            }
        });
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isAuth = await this.firebase.isAuth();
        if (this.isAuth)
            return this.isAuth;
        if (!isAuth)
            this.router.navigate(['/']);
        // console.log(isAuth);
        // return isAuth;
        return true;
    }
}
