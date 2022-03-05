import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbModal, NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgxPaginationModule} from "ngx-pagination";
import {Observable} from "rxjs";

import {OrderViewComponent} from './order-view.component';

import {AuthService} from "../../../services/auth.service";
import {OrderService} from "../../../services/order.service";

import {Order} from "../../../types/order";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {OrderStatus} from "../../../types/enums/order-status";

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
}

class MockAuthService {
  isAdmin(): boolean {
    return false;
  }
}

class MockModalService {
  open(): { componentInstance: { order: { id: string | null } }, result: Promise<string> } {
    return {
      componentInstance: {
        order: {id: null},
      },
      result: new Promise<string>(resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')),
    };
  };
}

describe('OrderViewComponent', () => {
  let component: OrderViewComponent;
  let fixture: ComponentFixture<OrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OrderViewComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: OrderService, useClass: MockOrderService},
        {provide: AuthService, useClass: MockAuthService},
        {provide: NgbModal, useClass: MockModalService},
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderViewComponent);
    component = fixture.componentInstance;
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
    expect(component.canInteract).toBeFalse();

    expect(component.orderViewForm.controls['itemName'].value).toBe('Fantastic Concrete Pizza');
    expect(component.orderViewForm.controls['quantity'].value).toBe(10);
    expect(component.orderViewForm.controls['url'].value).toBe('conrad.de/pizza');
    expect(component.orderViewForm.controls['status'].value).toBe(3);
  }));

  it('should init page whith item name', fakeAsync(() => {
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
    expect(component.canInteract).toBeTrue();

    expect(component.orderViewForm.controls['itemName'].value).toBe('Awesome Granite Towels');
    expect(component.orderViewForm.controls['quantity'].value).toBe(42962);
    expect(component.orderViewForm.controls['url'].value).toBe('https://clementine.biz');
    expect(component.orderViewForm.controls['status'].value).toBe(1);
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

    const consoleError = spyOn(console, 'error');

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
    expect(component.canInteract).toBeFalse();

    expect(component.orderViewForm.controls['itemName'].value).toBe('');
    expect(component.orderViewForm.controls['quantity'].value).toBe(0);
    expect(component.orderViewForm.controls['url'].value).toBe('');
    expect(component.orderViewForm.controls['status'].value).toBe(0);

    localStorage.removeItem('throwError');
  }));

  it('should open order edit form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'edited');

    const getOrderDataMethod = spyOn(component, 'getOrderData');

    component.openOrderEditForm();
    tick();

    expect(getOrderDataMethod).toHaveBeenCalledWith();
    expect(component.dirty).toBeTrue();

    localStorage.removeItem('returnVal');
  }));

  it('should open order deletion form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    const closeModalMethod = spyOn(component.activeModal, 'close');

    component.openOrderDeletionDialog();
    tick();

    expect(closeModalMethod).toHaveBeenCalledWith('dirty');

    localStorage.removeItem('returnVal');
  }));

  it('should open inventory order form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'inventoried 045fcd70-d323-4de2-894e-a10772b23457');

    const getOrderDataMethod = spyOn(component, 'getOrderData');

    component.openInventoryOrderForm();
    tick();

    expect(getOrderDataMethod).toHaveBeenCalledWith();
    expect(component.dirty).toBeTrue();

    localStorage.removeItem('returnVal');
  }));
});
