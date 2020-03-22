import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMoveComponent } from './exam-move.component';

describe('ExamMoveComponent', () => {
  let component: ExamMoveComponent;
  let fixture: ComponentFixture<ExamMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
