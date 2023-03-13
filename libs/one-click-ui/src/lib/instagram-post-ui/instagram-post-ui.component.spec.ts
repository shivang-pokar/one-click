import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramPostUiComponent } from './instagram-post-ui.component';

describe('InstagramPostUiComponent', () => {
  let component: InstagramPostUiComponent;
  let fixture: ComponentFixture<InstagramPostUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstagramPostUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstagramPostUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
