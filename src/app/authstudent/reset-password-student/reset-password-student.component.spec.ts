import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordStudentComponent } from './reset-password-student.component';

describe('ResetPasswordStudentComponent', () => {
  let component: ResetPasswordStudentComponent;
  let fixture: ComponentFixture<ResetPasswordStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
