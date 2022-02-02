import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeclineComponent } from './order-decline.component';

describe('OrderDeclineComponent', () => {
  let component: OrderDeclineComponent;
  let fixture: ComponentFixture<OrderDeclineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDeclineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
