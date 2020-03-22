import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSetupComponent } from './image-setup.component';

describe('ImageSetupComponent', () => {
  let component: ImageSetupComponent;
  let fixture: ComponentFixture<ImageSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
