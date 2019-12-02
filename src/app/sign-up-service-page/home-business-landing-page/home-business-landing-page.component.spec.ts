import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBusinessLandingPageComponent } from './home-business-landing-page.component';

describe('HomeBusinessLandingPageComponent', () => {
  let component: HomeBusinessLandingPageComponent;
  let fixture: ComponentFixture<HomeBusinessLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBusinessLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBusinessLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
