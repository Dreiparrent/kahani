import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

    // size = new BehaviorSubject({ innerwidth: 0, innerHeight: 0 });
    public window = new Subject<Window>();
    private _windowUpdate: Window;
    public recordDevice: MediaDeviceInfo;
    get windowUpdate() {
        return this._windowUpdate;
    }
    set windowUpdate(v: Window) {
        this._windowUpdate = v;
    }
    constructor() {
        window.addEventListener('resize', (ev: UIEvent) => {
            this.window.next(ev.view);
        }, {passive: true});
    }
}