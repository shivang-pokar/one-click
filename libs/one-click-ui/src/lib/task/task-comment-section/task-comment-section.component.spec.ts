import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCommentSectionComponent } from './task-comment-section.component';

describe('TaskCommentSectionComponent', () => {
  let component: TaskCommentSectionComponent;
  let fixture: ComponentFixture<TaskCommentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCommentSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCommentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
