import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationSendTypeComponent } from './examination-send-type.component';

describe('ExaminationSendTypeComponent', () => {
  let component: ExaminationSendTypeComponent;
  let fixture: ComponentFixture<ExaminationSendTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationSendTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationSendTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
