import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterPostUiComponent } from './twitter-post-ui.component';

describe('TwitterPostUiComponent', () => {
  let component: TwitterPostUiComponent;
  let fixture: ComponentFixture<TwitterPostUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitterPostUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwitterPostUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
