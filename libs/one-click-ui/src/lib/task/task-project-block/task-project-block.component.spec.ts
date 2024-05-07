import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskProjectBlockComponent } from './task-project-block.component';

describe('TaskProjectBlockComponent', () => {
  let component: TaskProjectBlockComponent;
  let fixture: ComponentFixture<TaskProjectBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskProjectBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskProjectBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
