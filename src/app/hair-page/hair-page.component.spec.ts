import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HairPageComponent } from './hair-page.component';

describe('HairPageComponent', () => {
  let component: HairPageComponent;
  let fixture: ComponentFixture<HairPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HairPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HairPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
