import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsMarksEditComponent } from './students-marks-edit.component';

describe('StudentsMarksEditComponent', () => {
  let component: StudentsMarksEditComponent;
  let fixture: ComponentFixture<StudentsMarksEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsMarksEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsMarksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
