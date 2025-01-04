import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteDailogComponent } from './invite-dailog.component';

describe('InviteDailogComponent', () => {
  let component: InviteDailogComponent;
  let fixture: ComponentFixture<InviteDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviteDailogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InviteDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
