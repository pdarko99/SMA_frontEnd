import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsInfoEditComponent } from './students-info-edit.component';

describe('StudentsInfoEditComponent', () => {
  let component: StudentsInfoEditComponent;
  let fixture: ComponentFixture<StudentsInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsInfoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
