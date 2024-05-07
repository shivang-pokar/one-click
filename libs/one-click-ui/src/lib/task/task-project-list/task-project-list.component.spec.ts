import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskProjectListComponent } from './task-project-list.component';

describe('TaskProjectListComponent', () => {
  let component: TaskProjectListComponent;
  let fixture: ComponentFixture<TaskProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskProjectListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
