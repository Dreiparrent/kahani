import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-version',
    template: `
        <p>
            Version: {{version}}
        </p>
    `,
    styles: []
})
export class VersionComponent implements OnInit {

    public version = environment.version.version;
    constructor() {}

    ngOnInit() {}
}
