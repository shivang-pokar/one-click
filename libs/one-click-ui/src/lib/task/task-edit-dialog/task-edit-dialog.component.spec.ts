import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditDialogComponent } from './task-edit-dialog.component';

describe('TaskEditDialogComponent', () => {
  let component: TaskEditDialogComponent;
  let fixture: ComponentFixture<TaskEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
