import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsubSearchComponent } from './subjectsub-search.component';

describe('SubjectsubSearchComponent', () => {
  let component: SubjectsubSearchComponent;
  let fixture: ComponentFixture<SubjectsubSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsubSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsubSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
