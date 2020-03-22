import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStaffHistoryComponent } from './login-staff-history.component';

describe('LoginStaffHistoryComponent', () => {
  let component: LoginStaffHistoryComponent;
  let fixture: ComponentFixture<LoginStaffHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginStaffHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStaffHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
