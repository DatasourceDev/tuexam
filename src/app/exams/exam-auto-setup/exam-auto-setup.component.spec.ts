import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAutoSetupComponent } from './exam-auto-setup.component';

describe('ExamAutoSetupComponent', () => {
  let component: ExamAutoSetupComponent;
  let fixture: ComponentFixture<ExamAutoSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamAutoSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamAutoSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
