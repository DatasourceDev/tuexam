import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttitudeSetupComponent } from './attitude-setup.component';

describe('AttitudeSetupComponent', () => {
  let component: AttitudeSetupComponent;
  let fixture: ComponentFixture<AttitudeSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttitudeSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttitudeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
