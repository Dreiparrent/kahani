import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DashSidenavComponent } from './sidenav.component';
describe('DashSidenavComponent', () => {
  let component: DashSidenavComponent;
  let fixture: ComponentFixture<DashSidenavComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DashSidenavComponent]
    });
    fixture = TestBed.createComponent(DashSidenavComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
