import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectgroupSearchComponent } from './subjectgroup-search.component';


describe('SubjectgroupSearchComponent', () => {
  let component: SubjectgroupSearchComponent;
  let fixture: ComponentFixture<SubjectgroupSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectgroupSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectgroupSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
