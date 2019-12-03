import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestQrandomComponent } from './test-qrandom.component';

describe('TestQrandomComponent', () => {
  let component: TestQrandomComponent;
  let fixture: ComponentFixture<TestQrandomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestQrandomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestQrandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
