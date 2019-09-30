import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsubComponent } from './subjectsub.component';

describe('SubjectsubComponent', () => {
  let component: SubjectsubComponent;
  let fixture: ComponentFixture<SubjectsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
