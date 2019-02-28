// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const tsConfig = require('./tsconfig.e2e.json');
exports.config = {
    allScriptsTimeout: 20000,
    specs: ['./src/**/*.e2e-spec.ts'],
    capabilities: {
        browserName: 'chrome'
    },
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    onPrepare() {
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });
        require('tsconfig-paths').register({
            project: 'e2e/tsconfig.e2e.json',
            baseUrl: './',
            paths: tsConfig.compilerOptions.paths
        });
        jasmine
            .getEnv()
            .addReporter(
                new SpecReporter({ spec: { displayStacktrace: true } })
            );
    }
};
