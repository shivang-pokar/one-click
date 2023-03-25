import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialChipComponent } from './social-chip.component';

describe('SocialChipComponent', () => {
  let component: SocialChipComponent;
  let fixture: ComponentFixture<SocialChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
