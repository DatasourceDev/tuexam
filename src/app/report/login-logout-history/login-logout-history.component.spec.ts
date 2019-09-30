import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLogoutHistoryComponent } from './login-logout-history.component';

describe('LoginLogoutHistoryComponent', () => {
  let component: LoginLogoutHistoryComponent;
  let fixture: ComponentFixture<LoginLogoutHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginLogoutHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginLogoutHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
