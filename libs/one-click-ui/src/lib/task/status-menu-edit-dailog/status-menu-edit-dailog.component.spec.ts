import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMenuEditDailogComponent } from './status-menu-edit-dailog.component';

describe('StatusMenuEditDailogComponent', () => {
  let component: StatusMenuEditDailogComponent;
  let fixture: ComponentFixture<StatusMenuEditDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusMenuEditDailogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusMenuEditDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
