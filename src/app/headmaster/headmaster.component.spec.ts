import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadmasterComponent } from './headmaster.component';

describe('HeadmasterComponent', () => {
  let component: HeadmasterComponent;
  let fixture: ComponentFixture<HeadmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
