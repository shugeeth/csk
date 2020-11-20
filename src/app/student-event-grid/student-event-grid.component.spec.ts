import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEventGridComponent } from './student-event-grid.component';

describe('StudentEventGridComponent', () => {
  let component: StudentEventGridComponent;
  let fixture: ComponentFixture<StudentEventGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEventGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEventGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
