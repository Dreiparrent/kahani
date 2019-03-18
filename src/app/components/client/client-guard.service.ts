import { UrlSegment, UrlMatchResult, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ClientGuardService implements CanActivate {
    isAuth: boolean;
    lastUrl: string;

    constructor(private firebase: FirebaseService, private router: Router) {
        this.firebase.user.subscribe(user => {
            if (user) {
                this.router.navigate([this.lastUrl]);
                this.isAuth = true;
            }
        });
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.lastUrl = state.url;
        const isAuth = await this.firebase.isAuth();
        const client = await this.firebase.getClient(route.params['id']);
        if (this.isAuth && client)
            return this.isAuth;
        if (!isAuth)
            this.router.navigate(['/']);
        // console.log(isAuth);
        // return isAuth;
        return true;
    }
}

@Injectable()
export class VideoGuardService implements CanActivate {
    isAuth: boolean;
    lastUrl: string;

    constructor(private firebase: FirebaseService, private router: Router) {
        // this.firebase._response.subscribe(response => {
        //     if (response) {
        //         this.router.navigate([this.lastUrl], {skipLocationChange: true});
        //         this.isAuth = true;
        //     }
        // });
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.lastUrl = state.url;
        this.isAuth = await this.firebase.isAuth();
        console.log(route.params['campaign'], route.params['video']);
        const videos = await this.firebase.getVideos(route.params['campaign'], route.params['video']);
        console.log('vids', videos);
        if (this.isAuth && videos)
            return videos;
        else
            this.router.navigate(['/']);
        // console.log(isAuth);
        // return isAuth;
        return false;
    }
}

@Injectable()
export class ClientPathMatcher {
    static pathMatcher(segments: UrlSegment[]): UrlMatchResult {
        if (segments.length < 2)
            return null;

        const url1 = segments[1].toString();
        const com404 = /^(404)$/;

        if (url1.match(com404))
            return null;
        return ({ consumed: [segments[0], segments[1]], posParams: { id: segments[1] } });
    }
    static videoMatcher(segments: UrlSegment[]): UrlMatchResult {
        if (segments.length < 2)
            return null;

        const url1 = segments[1].toString();
        const com404 = /^(404)$/;

        if (url1.match(com404))
            return null;
        return ({ consumed: segments, posParams: { campaign: segments[1], video: segments[2] } });
    }
}