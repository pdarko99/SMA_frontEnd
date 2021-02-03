import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadRegistrationComponent } from './head-registration.component';

describe('HeadRegistrationComponent', () => {
  let component: HeadRegistrationComponent;
  let fixture: ComponentFixture<HeadRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
