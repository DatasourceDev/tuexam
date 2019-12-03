import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestQcustomComponent } from './test-qcustom.component';

describe('TestQcustomComponent', () => {
  let component: TestQcustomComponent;
  let fixture: ComponentFixture<TestQcustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestQcustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestQcustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
