import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWritingHistoryComponent } from './content-writing-history.component';

describe('ContentWritingHistoryComponent', () => {
  let component: ContentWritingHistoryComponent;
  let fixture: ComponentFixture<ContentWritingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentWritingHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentWritingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
