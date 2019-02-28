import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { environment } from 'src/environments/environment';

describe('App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display version', () => {
        page.navigateTo();
        if (environment.version.includeVersion)
            expect(page.getVersion()).toEqual('Version: ' + environment.version.version);
        else
            expect(environment.version.includeVersion).toEqual(false);
    });

    it('should display client home', () => {
        page.navigateTo();
        expect(page.getClient()).toEqual(true);
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser
            .manage()
            .logs()
            .get(logging.Type.BROWSER);
        expect(logs).not.toContain(
            jasmine.objectContaining({
                level: logging.Level.SEVERE
            })
        );
    });
});
