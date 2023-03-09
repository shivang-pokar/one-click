import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthChannelComponent } from './auth-channel.component';

describe('AuthChannelComponent', () => {
  let component: AuthChannelComponent;
  let fixture: ComponentFixture<AuthChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
