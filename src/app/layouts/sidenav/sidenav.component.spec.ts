import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SidenavService } from './sidenav.service';
import { SidenavComponent } from './sidenav.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  beforeEach(() => {
    const sidenavServiceStub = { sidenav: {} };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      declarations: [SidenavComponent],
      providers: [{ provide: SidenavService, useValue: sidenavServiceStub }]
    });
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
