import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPhotosPageComponent } from './sign-up-photos-page.component';

describe('SignUpPhotosPageComponent', () => {
  let component: SignUpPhotosPageComponent;
  let fixture: ComponentFixture<SignUpPhotosPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpPhotosPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPhotosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
