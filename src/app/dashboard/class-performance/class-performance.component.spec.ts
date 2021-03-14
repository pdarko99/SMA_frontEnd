import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassPerformanceComponent } from './class-performance.component';

describe('ClassPerformanceComponent', () => {
  let component: ClassPerformanceComponent;
  let fixture: ComponentFixture<ClassPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
