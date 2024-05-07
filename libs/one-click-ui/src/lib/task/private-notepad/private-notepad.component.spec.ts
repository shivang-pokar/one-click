import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateNotepadComponent } from './private-notepad.component';

describe('PrivateNotepadComponent', () => {
  let component: PrivateNotepadComponent;
  let fixture: ComponentFixture<PrivateNotepadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivateNotepadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateNotepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
