import { browser, by, element, $ } from 'protractor';
import * as fs from 'fs';
export class RecordPage {

    private recordEl = $('app-client-record');
    private questionEl = $('app-client-question');

    setWidth(md: 'xs' | 'sm' | 'lg') {
        let width = 1920;
        let height = 1080; //tslint:disable-line
        switch (md) {
            case 'xs':
                width = 200;
                break;
            case 'sm':
                width = 500;
                break;
            default:
                break;
        }
        return browser.manage().window().setSize(width, height) as Promise<void>;
    }

    navigateTo(timer = false) {
        return Promise.resolve(() => timer ? 0 : 500)
            .then(resolve => setTimeout(resolve, resolve()))
            .then(() => browser.get('/record'))
            .catch(error => {
                console.log(error);
                return browser.get('record');
            }) as Promise<any>;
    }

    getQuestionTitle() {
        return this.questionEl.element(by.css('h1')).getText() as Promise<string>;
    }

    isQuestionDisplayed() {
        return this.questionEl.isPresent() as Promise<boolean>;
    }

    getStarterPos() {
        return this.recordEl.$('.starter').getCssValue('right') as Promise<string>;
    }

    getSenderPos() {
        return this.recordEl.$('.sender').getCssValue('right') as Promise<string>;
    }

    async takeScreenShot(name: string) {
        const shot = await browser.takeScreenshot();
        if (!fs.existsSync('e2e/screen-shots'))
            fs.mkdirSync('e2e/screen-shots');
        const stream = fs.createWriteStream('e2e/screen-shots/' + name + '.png');
        const success = stream.write(new Buffer(shot, 'base64'));
        stream.end();
        return success;
    }
}
