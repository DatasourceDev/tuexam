import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendResultSetupComponent } from './send-result-setup.component';

describe('SendResultSetupComponent', () => {
  let component: SendResultSetupComponent;
  let fixture: ComponentFixture<SendResultSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendResultSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendResultSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
