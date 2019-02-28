const config = require('./protractor.conf').config; //tslint:disable-line
config.capabilities = {
    browserName: 'chrome',
    chromeOptions: {
        args: [
            '--disable-web-security',
            '--user-data-dir=e2e/e2e-chrome-profile',
            '--use-fake-ui-for-media-stream',
        ]
    }
};
config.suites = {
    client: './src/client/**/*.e2e-spec.ts',
    app: './src/**/*.e2e-spec.ts'
}

exports.config = config;
// '--headless', '--no-sandbox',