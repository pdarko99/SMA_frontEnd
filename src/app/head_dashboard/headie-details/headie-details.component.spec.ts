import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadieDetailsComponent } from './headie-details.component';

describe('HeadieDetailsComponent', () => {
  let component: HeadieDetailsComponent;
  let fixture: ComponentFixture<HeadieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadieDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
