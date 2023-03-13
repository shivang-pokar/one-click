import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookPostUiComponent } from './facebook-post-ui.component';

describe('FacebookPostUiComponent', () => {
  let component: FacebookPostUiComponent;
  let fixture: ComponentFixture<FacebookPostUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacebookPostUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacebookPostUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
