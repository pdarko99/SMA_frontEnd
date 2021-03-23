import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsPerformanceComponent } from './students-performance.component';

describe('StudentsPerformanceComponent', () => {
  let component: StudentsPerformanceComponent;
  let fixture: ComponentFixture<StudentsPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
