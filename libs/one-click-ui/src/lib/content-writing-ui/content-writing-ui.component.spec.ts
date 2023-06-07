import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWritingUiComponent } from './content-writing-ui.component';

describe('ContentWritingUiComponent', () => {
  let component: ContentWritingUiComponent;
  let fixture: ComponentFixture<ContentWritingUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentWritingUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentWritingUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
