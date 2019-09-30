import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSearchComponent } from './grade-search.component';

describe('GradeSearchComponent', () => {
  let component: GradeSearchComponent;
  let fixture: ComponentFixture<GradeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
