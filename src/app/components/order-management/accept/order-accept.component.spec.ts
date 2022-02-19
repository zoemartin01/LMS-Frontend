import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { OrderAcceptComponent } from './order-accept.component';

describe('OrderAcceptComponent', () => {
  let component: OrderAcceptComponent;
  let fixture: ComponentFixture<OrderAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OrderAcceptComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAcceptComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
