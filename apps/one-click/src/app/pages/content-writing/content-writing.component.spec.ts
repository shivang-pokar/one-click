import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWritingComponent } from './content-writing.component';

describe('ContentWritingComponent', () => {
  let component: ContentWritingComponent;
  let fixture: ComponentFixture<ContentWritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentWritingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentWritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
