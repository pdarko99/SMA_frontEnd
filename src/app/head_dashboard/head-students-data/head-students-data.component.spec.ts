import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadStudentsDataComponent } from './head-students-data.component';

describe('HeadStudentsDataComponent', () => {
  let component: HeadStudentsDataComponent;
  let fixture: ComponentFixture<HeadStudentsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadStudentsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadStudentsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
