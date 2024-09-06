import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryMenuComponent } from './summary-menu.component';

describe('SummaryMenuComponent', () => {
  let component: SummaryMenuComponent;
  let fixture: ComponentFixture<SummaryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummaryMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
