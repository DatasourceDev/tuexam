import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationSummaryComponent } from './examination-summary.component';

describe('ExaminationSummaryComponent', () => {
  let component: ExaminationSummaryComponent;
  let fixture: ComponentFixture<ExaminationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
