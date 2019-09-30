import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeProveComponent } from './grade-prove.component';

describe('GradeProveComponent', () => {
  let component: GradeProveComponent;
  let fixture: ComponentFixture<GradeProveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeProveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeProveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
