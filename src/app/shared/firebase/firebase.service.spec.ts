import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { mockAngularFireStorage } from './firebase.service.spy';

describe('FirebaseService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            { provide: AngularFireStorage, useValue: mockAngularFireStorage }
        ]
  }));

  it('should be created', () => {
    const service: FirebaseService = TestBed.get(FirebaseService);
    expect(service).toBeTruthy();
  });
});
