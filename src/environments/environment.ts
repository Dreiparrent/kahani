// import { testConfig, testClient } from 'src/app/shared/firebase/constatnts';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
enum VideoDevices {
    none, front, rear, ir
}
const videoDevices =
    ['', 'aee9cf81256e169d48c41aa4ddc637b8a1f6d562d44924ee46aa917d463b8beb',
        '452e07a4494702081ae114136386c2542cb9f953d7c43ba1e0ee1d9e1cfa4005',
        '71c5b114b28f2e7d4430803a8b120ef972f1d4877cfe50a2a1a3764a63a3225b'];
const skipAll = false;
export const environment = {
    production: false,
    routing: {
        tracing: false,
        redirect: true,
        link: 'dash'
    },
    tosAccept: true,
    recorder: {
        popup: {
            skip: skipAll ? true : false,
            autoOpenExtra: true,
        },
        countdown: {
            start: skipAll ? true : false,
            skip: skipAll ? true : false,
        },
        upload: {
            skip: false
        },
        deviceAlert: {
            skip: false
        },
        videoDevice: videoDevices[VideoDevices.rear],
        buttonColor: 'white',
    },
    firebase: {
        apiKey: 'AIzaSyAR4UjEAaBkOKrOLndkoQolD0TlVOkPo30',
        authDomain: 'kahani-dev.firebaseapp.com',
        databaseURL: 'https://kahani-dev.firebaseio.com',
        projectId: 'kahani-dev',
        storageBucket: 'kahani-dev.appspot.com',
        messagingSenderId: '355817783626'
    },
    useLocal: false,
    // clientConfig: testClient,
    // campaignConfig: testConfig,
    dash: {
        openCampaign: false,
        // campaign: testConfig,
        openAll: true
    },
    version: {
        includeVersion: false,
        version: '0.3.0'
    },
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
