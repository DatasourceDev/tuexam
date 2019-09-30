import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationEndComponent } from './examination-end.component';

describe('ExaminationEndComponent', () => {
  let component: ExaminationEndComponent;
  let fixture: ComponentFixture<ExaminationEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
