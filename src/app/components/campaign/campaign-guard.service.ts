import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlSegment, UrlMatchResult } from '@angular/router';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { Campaign } from 'src/app/shared/firebase/constatnts';

@Injectable()
export class CampaignGuardService implements CanActivate {
    constructor(private firebase: FirebaseService, private router: Router) {

    }
    async canActivate(route: ActivatedRouteSnapshot) {
        console.log(typeof route.params['id'], route.params['id']);
        const campaignData = await this.firebase.getUrl(route.params['id']);
        // const campaignData = await this.firebase.getUrl('link');
        // console.log(campaignData);
        if (campaignData) {
            this.firebase.campaign = new Campaign(campaignData);
            return true;
        }
        return false;
    }
}
@Injectable()
export class CampaignPathMatcher {
    static pathMatcher(segments: UrlSegment[]): UrlMatchResult {
        const outsideLinks = /^(dash)|(login)|(client)$/;
        if (segments.length > 0 && segments[0].toString().match(outsideLinks))
            return null;
        const links = /^(tos)|(record)$/;
        if (segments.length < 1 || segments[0].toString().match(links)) {
            return ({ consumed: [], posParams: { id: new UrlSegment('link', {}) } });
        }
        return ({ consumed: [segments[0]], posParams: { id: segments[0] } });
    }
}