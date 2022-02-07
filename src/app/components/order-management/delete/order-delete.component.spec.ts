import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { OrderDeleteComponent } from './order-delete.component';

describe('OrderDeleteComponent', () => {
  let component: OrderDeleteComponent;
  let fixture: ComponentFixture<OrderDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OrderDeleteComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDeleteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
