import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDataSectionComponent } from './post-data-section.component';

describe('PostDataSectionComponent', () => {
  let component: PostDataSectionComponent;
  let fixture: ComponentFixture<PostDataSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDataSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDataSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
