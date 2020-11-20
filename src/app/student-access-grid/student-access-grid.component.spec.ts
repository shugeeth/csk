import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAccessGridComponent } from './student-access-grid.component';

describe('StudentAccessGridComponent', () => {
  let component: StudentAccessGridComponent;
  let fixture: ComponentFixture<StudentAccessGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAccessGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAccessGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
