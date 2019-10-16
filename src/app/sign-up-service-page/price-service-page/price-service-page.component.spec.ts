import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceServicePageComponent } from './price-service-page.component';

describe('PriceServicePageComponent', () => {
  let component: PriceServicePageComponent;
  let fixture: ComponentFixture<PriceServicePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceServicePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
