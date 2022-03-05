import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";

import {OrderAcceptComponent} from './order-accept.component';

import {OrderService} from "../../../services/order.service";

import {Order} from "../../../types/order";
import {OrderStatus} from "../../../types/enums/order-status";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {OrderId} from "../../../types/aliases/order-id";

class MockOrderService {
  getOrderData(id: string): Observable<Order> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Inventory Item not Found.',
          }
        });
      }

      id === "40ecc367-e0a9-4f57-8fe4-4d56b2e0184b"
        ? observer.next({
          id: "40ecc367-e0a9-4f57-8fe4-4d56b2e0184b",
          itemName: "Awesome Granite Towels",
          status: 1,
          quantity: 42962,
          url: "https://clementine.biz",
          user: {
            id: "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
            email: "visitor@test.com",
            firstName: "Visitor",
            lastName: "Visitor",
            role: 2,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          },
          item: null
        })
        : observer.next({
          id: "045fcd70-d323-4de2-894e-a10772b23457",
          itemName: null,
          status: 3,
          quantity: 10,
          url: "conrad.de/pizza",
          user: {
            id: "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
            email: "visitor@test.com",
            firstName: "Visitor",
            lastName: "Visitor",
            role: 2,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          },
          item: {
            id: "920b8cc7-364f-4255-9540-09093f1e167a",
            name: "Fantastic Concrete Pizza",
            description: "Cum exercitationem est.",
            quantity: 49691
          }
        });
    });
  }

  updateOrderData(orderId: OrderId, changedData: any): Observable<Order> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Inventory Item not Found.',
          }
        });
      }

      observer.next({
        id: "40ecc367-e0a9-4f57-8fe4-4d56b2e0184b",
        itemName: "Awesome Granite Towels",
        status: changedData.status,
        quantity: 42962,
        url: "https://clementine.biz",
        user: {
          id: "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
          email: "visitor@test.com",
          firstName: "Visitor",
          lastName: "Visitor",
          role: 2,
          emailVerification: true,
          isActiveDirectory: false,
          notificationChannel: 3
        },
        item: null
      });
    });
  }

  acceptOrderRequest(orderId: OrderId): Observable<Order> {
    return this.updateOrderData(orderId, {status: OrderStatus.ordered});
  }
}

describe('OrderAcceptComponent', () => {
  let component: OrderAcceptComponent;
  let fixture: ComponentFixture<OrderAcceptComponent>;
  let consoleError: jasmine.Spy<any>;

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
        {provide: OrderService, useClass: MockOrderService},
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAcceptComponent);
    component = fixture.componentInstance;

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page with linked item', fakeAsync(() => {
    expect(component.order).toEqual({
      id: null,
      itemName: null,
      item: null,
      quantity: null,
      url: '',
      user: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        role: UserRole.unknown,
        notificationChannel: NotificationChannel.unknown,
        emailVerification: true,
        isActiveDirectory: false,
      },
      status: OrderStatus.unknown,
    });

    component.order.id = "045fcd70-d323-4de2-894e-a10772b23457";

    component.ngOnInit();

    tick();

    expect(component.order).toEqual({
      id: "045fcd70-d323-4de2-894e-a10772b23457",
      itemName: null,
      status: 3,
      quantity: 10,
      url: "conrad.de/pizza",
      user: {
        id: "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
        email: "visitor@test.com",
        firstName: "Visitor",
        lastName: "Visitor",
        role: 2,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      },
      item: {
        id: "920b8cc7-364f-4255-9540-09093f1e167a",
        name: "Fantastic Concrete Pizza",
        description: "Cum exercitationem est.",
        quantity: 49691
      }
    });

    expect(component.orderAcceptForm.controls['itemName'].value).toBe('Fantastic Concrete Pizza');
    expect(component.orderAcceptForm.controls['quantity'].value).toBe(10);
    expect(component.orderAcceptForm.controls['url'].value).toBe('conrad.de/pizza');
    expect(component.orderAcceptForm.controls['status'].value).toBe(3);
  }));

  it('should init page with item name', fakeAsync(() => {
    expect(component.order).toEqual({
      id: null,
      itemName: null,
      item: null,
      quantity: null,
      url: '',
      user: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        role: UserRole.unknown,
        notificationChannel: NotificationChannel.unknown,
        emailVerification: true,
        isActiveDirectory: false,
      },
      status: OrderStatus.unknown,
    });

    component.order.id = "40ecc367-e0a9-4f57-8fe4-4d56b2e0184b";

    component.ngOnInit();

    tick();

    expect(component.order).toEqual({
      id: "40ecc367-e0a9-4f57-8fe4-4d56b2e0184b",
      itemName: "Awesome Granite Towels",
      status: 1,
      quantity: 42962,
      url: "https://clementine.biz",
      user: {
        id: "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
        email: "visitor@test.com",
        firstName: "Visitor",
        lastName: "Visitor",
        role: 2,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      },
      item: null
    });

    expect(component.orderAcceptForm.controls['itemName'].value).toBe('Awesome Granite Towels');
    expect(component.orderAcceptForm.controls['quantity'].value).toBe(42962);
    expect(component.orderAcceptForm.controls['url'].value).toBe('https://clementine.biz');
    expect(component.orderAcceptForm.controls['status'].value).toBe(1);
  }));

  it('should throw error on page init', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    expect(component.order).toEqual({
      id: null,
      itemName: null,
      item: null,
      quantity: null,
      url: '',
      user: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        role: UserRole.unknown,
        notificationChannel: NotificationChannel.unknown,
        emailVerification: true,
        isActiveDirectory: false,
      },
      status: OrderStatus.unknown,
    });

    component.order.id = "045fcd70-d323-4de2-894e-a10772b23457";

    component.ngOnInit();

    tick();

    expect(consoleError).toHaveBeenCalled();
    expect(component.order).toEqual({
      id: "045fcd70-d323-4de2-894e-a10772b23457",
      itemName: null,
      item: null,
      quantity: null,
      url: '',
      user: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        role: UserRole.unknown,
        notificationChannel: NotificationChannel.unknown,
        emailVerification: true,
        isActiveDirectory: false,
      },
      status: OrderStatus.unknown,
    });

    expect(component.orderAcceptForm.controls['itemName'].value).toBe('');
    expect(component.orderAcceptForm.controls['quantity'].value).toBe(0);
    expect(component.orderAcceptForm.controls['url'].value).toBe('');
    expect(component.orderAcceptForm.controls['status'].value).toBe(0);

    localStorage.removeItem('throwError');
  }));

  it('should edit order', fakeAsync(() => {
    component.order.id = "40ecc367-e0a9-4f57-8fe4-4d56b2e0184b";

    const modalClose = spyOn(component.activeModal, 'close');

    component.acceptOrder();

    tick();

    expect(modalClose).toHaveBeenCalledWith('accepted');
  }));

  it('should throw error on edit of order', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.order.id = "40ecc367-e0a9-4f57-8fe4-4d56b2e0184b";

    component.acceptOrder();

    tick();

    expect(component.errorMessage).toEqual('Inventory Item not Found.');

    localStorage.removeItem('throwError');
  }));
});
