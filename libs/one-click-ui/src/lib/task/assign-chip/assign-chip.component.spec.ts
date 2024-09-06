import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignChipComponent } from './assign-chip.component';

describe('AssignChipComponent', () => {
  let component: AssignChipComponent;
  let fixture: ComponentFixture<AssignChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
