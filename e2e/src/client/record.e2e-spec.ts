import { RecordPage } from './record.po';
import { browser, logging } from 'protractor';
import { environment } from 'src/environments/environment';

describe('ClientRecord', () => {
    let page: RecordPage;

    beforeAll(() => {
        browser.manage().window().setSize(1920, 1080);
        page = new RecordPage();
        page.navigateTo();
    });

    beforeEach(() => {
        // page was here but we don't got time
    });

    it('should display title', () => {
        expect(page.getQuestionTitle()).toEqual(environment.clientConfig.name);
    });

    describe('RESIZING to', () => {
        let name = 'lg';

        describe('LG', () => {
            beforeAll(() => {
                page = new RecordPage();
                page.navigateTo();
                page.setWidth('lg');
                // setTimeout(done, 5000);
            });
            it('should not hide', () => {
                expect(page.isQuestionDisplayed()).toBe(true);
            });
            it('should hide starter', () => {
                expect(page.isStarterDisplayed()).toEqual(true);
            });
            xit('should position starter', () => {
                expect(page.getStarterPos()).toEqual('3vw');
            });
            it('should position sender', () => {
                expect(page.getSenderPos()).toEqual('-30vw');
            });
        });
        describe('SM', () => {
            beforeAll(() => {
                name = 'sm';
                page = new RecordPage();
                page.navigateTo();
                page.setWidth('sm');
            });
            it('should hide', () => {
                expect(page.isQuestionDisplayed()).toBe(false);
            });
            it('should position starter', () => {
                expect(page.getStarterPos()).toEqual('3vw');
            });
            it('should position sender', () => {
                expect(page.getSenderPos()).toEqual('3-vw');
            });
        });
        describe('XS', () => {
            beforeAll(() => {
                name = 'xs';
                page = new RecordPage();
                page.navigateTo();
                page.setWidth('xs');
            });
            it('should position starter', () => {
                expect(page.getStarterPos()).toEqual('3vw');
            });
            it('should position sender', () => {
                expect(page.getSenderPos()).toEqual('-30vw');
            });
            // setTimeout(done, 5000);
        });
        afterEach(async () => {
            const shot = await page.takeScreenShot(name);
            expect(typeof shot).toEqual('boolean');
        });
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