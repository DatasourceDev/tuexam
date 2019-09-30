import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationSelectComponent } from './examination-select.component';

describe('ExaminationSelectComponent', () => {
  let component: ExaminationSelectComponent;
  let fixture: ComponentFixture<ExaminationSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
