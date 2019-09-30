import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeEndComponent } from './grade-end.component';

describe('GradeEndComponent', () => {
  let component: GradeEndComponent;
  let fixture: ComponentFixture<GradeEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
