import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeDetailSearchComponent } from './grade-detail-search.component';

describe('GradeDetailSearchComponent', () => {
  let component: GradeDetailSearchComponent;
  let fixture: ComponentFixture<GradeDetailSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeDetailSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeDetailSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
