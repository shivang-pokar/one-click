import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListViewComponent } from './task-list-view.component';

describe('TaskListViewComponent', () => {
  let component: TaskListViewComponent;
  let fixture: ComponentFixture<TaskListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
