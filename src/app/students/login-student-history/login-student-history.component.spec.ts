import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStudentHistoryComponent } from './login-student-history.component';

describe('LoginStudentHistoryComponent', () => {
  let component: LoginStudentHistoryComponent;
  let fixture: ComponentFixture<LoginStudentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginStudentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStudentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
