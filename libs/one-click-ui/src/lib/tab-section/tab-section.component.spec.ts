import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSectionComponent } from './tab-section.component';

describe('TabSectionComponent', () => {
  let component: TabSectionComponent;
  let fixture: ComponentFixture<TabSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
