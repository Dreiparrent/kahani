import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/') as Promise<any>;
    }

    getVersion() {
        return element(
            by.css('app-root mat-sidenav-container mat-sidenav-content app-version p')
        ).getText() as Promise<string>;
    }

    getClient() {
        return element(
            by.css('app-root mat-sidenav-container mat-sidenav-content app-client')
        ).isDisplayed() as Promise<boolean>;
    }
}
