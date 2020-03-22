import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationMessageComponent } from './examination-message.component';

describe('ExaminationMessageComponent', () => {
  let component: ExaminationMessageComponent;
  let fixture: ComponentFixture<ExaminationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
