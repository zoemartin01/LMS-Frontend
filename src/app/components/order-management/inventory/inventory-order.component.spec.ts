import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { InventoryOrderComponent } from './inventory-order.component';

import { InventoryService } from "../../../services/inventory.service";
import { OrderService } from "../../../services/order.service";

import { Order } from "../../../types/order";
import { OrderId } from "../../../types/aliases/order-id";
import { OrderStatus } from "../../../types/enums/order-status";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";
import { InventoryItem } from "../../../types/inventory-item";
import { InventoryItemId } from "../../../types/aliases/inventory-item-id";
import { PagedResponse } from "../../../types/paged-response";
import { PagedList } from "../../../types/paged-list";

class MockOrderService {
  getOrderData(id: string): Observable<Order> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Inventory Item not Found.',
          },
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
            notificationChannel: 3,
          },
          item: null,
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
            notificationChannel: 3,
          },
          item: {
            id: "920b8cc7-364f-4255-9540-09093f1e167a",
            name: "Fantastic Concrete Pizza",
            description: "Cum exercitationem est.",
            quantity: 49691,
          },
        });
    });
  }

  updateOrderData(orderId: OrderId, changedData: object): Observable<Order> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Order not Found.',
          },
        });
      }

      observer.next({
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
          notificationChannel: 3,
        },
        item: {
          id: "920b8cc7-364f-4255-9540-09093f1e167a",
          name: "Fantastic Concrete Pizza",
          description: "Cum exercitationem est.",
          quantity: 49691,
        },
      });
    });
  }
}

class MockInventoryService {
  getInventoryItems(limit: number = 0, offset: number = 0): Observable<PagedResponse<InventoryItem>> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Internal Server Error.',
            },
          },
        });
      }

      let pagedList = new PagedList<InventoryItem>();
      pagedList.data = [
        {
          id: "920b8cc7-364f-4255-9540-09093f1e167a",
          name: "Fantastic Concrete Pizza",
          description: "Cum exercitationem est.",
          quantity: 49691,
        },
        {
          id: "5b3c87c9-81a7-411e-b55a-8486ba065b4b",
          name: "Fantastic Steel Soap",
          description: "Distinctio iste et est tenetur officiis quis.",
          quantity: 40424,
        },
      ];

      observer.next(pagedList);
    });
  }

  getInventoryItemByName(inventoryItemName: string): Observable<InventoryItem> {
    return new Observable((observer) => {
      if (inventoryItemName === 'Fantastic Error Soap') {
        observer.error({
          error: {
            message: 'Internal Server Error.',
          },
        });
        return;
      }

      if (inventoryItemName !== 'Fantastic Wooden Soap') {
        observer.error({
          error: {
            message: 'Internal Server Error.',
          },
          status: 404,
        });
        return;
      }

      observer.next({
        id: "920b8cc7-364f-4255-9540-09093f1e167a",
        name: "Fantastic Concrete Pizza",
        description: "Cum exercitationem est.",
        quantity: 49691,
      });
    });
  }

  editInventoryItem(inventoryItemId: InventoryItemId, changedData: object): Observable<InventoryItem> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Internal Server Error.',
          },
        });
      }

      observer.next({
        id: "920b8cc7-364f-4255-9540-09093f1e167a",
        name: "Fantastic Concrete Pizza",
        description: "Cum exercitationem est.",
        quantity: 49691,
      });
    });
  }

  createInventoryItem(name: string, description: string, quantity: number): Observable<InventoryItem> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Internal Server Error.',
          },
        });
      }

      observer.next({
        id: "920b8cc7-364f-4255-9540-09093f1e167a",
        name: "Fantastic Concrete Pizza",
        description: "Cum exercitationem est.",
        quantity: 49691,
      });
    });
  }
}

describe('InventoryOrderComponent', () => {
  let component: InventoryOrderComponent;
  let fixture: ComponentFixture<InventoryOrderComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InventoryOrderComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: OrderService, useClass: MockOrderService },
        { provide: InventoryService, useClass: MockInventoryService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryOrderComponent);
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
        notificationChannel: 3,
      },
      item: {
        id: "920b8cc7-364f-4255-9540-09093f1e167a",
        name: "Fantastic Concrete Pizza",
        description: "Cum exercitationem est.",
        quantity: 49691,
      },
    });

    expect(component.inventoryOrderForm.controls['itemName'].value).toBe('Fantastic Concrete Pizza');
    expect(component.inventoryOrderForm.controls['quantity'].value).toBe(10);
    expect(component.inventoryOrderForm.controls['url'].value).toBe('conrad.de/pizza');
    expect(component.inventoryOrderForm.controls['status'].value).toBe(3);
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
        notificationChannel: 3,
      },
      item: null,
    });

    expect(component.inventoryOrderForm.controls['itemName'].value).toBe('Awesome Granite Towels');
    expect(component.inventoryOrderForm.controls['quantity'].value).toBe(42962);
    expect(component.inventoryOrderForm.controls['url'].value).toBe('https://clementine.biz');
    expect(component.inventoryOrderForm.controls['status'].value).toBe(1);
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

    expect(component.inventoryOrderForm.controls['itemName'].value).toBe('');
    expect(component.inventoryOrderForm.controls['quantity'].value).toBe(0);
    expect(component.inventoryOrderForm.controls['url'].value).toBe('');
    expect(component.inventoryOrderForm.controls['status'].value).toBe(0);

    localStorage.removeItem('throwError');
  }));

  it('should inventory order', fakeAsync(() => {
    component.inventoryOrderForm.controls['itemName'].setValue('Fantastic Wooden Soap');
    component.inventoryOrderForm.controls['itemName'].markAsDirty();
    component.order.id = '5b3c87c9-81a7-411e-b55a-8486ba065b4b';
    component.order.quantity = 10;

    const modalClose = spyOn(component.activeModal, 'close');

    component.inventoryOrder();
    tick();

    expect(component.inventoryItem).toEqual({
      id: "920b8cc7-364f-4255-9540-09093f1e167a",
      name: "Fantastic Concrete Pizza",
      description: "Cum exercitationem est.",
      quantity: 49691,
    });

    expect(modalClose).toHaveBeenCalledWith('inventoried 5b3c87c9-81a7-411e-b55a-8486ba065b4b');
  }));

  it('should inventory order with new inventory item', fakeAsync(() => {
    component.inventoryOrderForm.controls['itemName'].setValue('Fantastic Metal Soap');
    component.inventoryOrderForm.controls['itemName'].markAsDirty();
    component.order.id = '5b3c87c9-81a7-411e-b55a-8486ba065b4b';
    component.order.quantity = 10;

    const modalClose = spyOn(component.activeModal, 'close');

    component.inventoryOrder();
    tick();

    expect(component.inventoryItem).toEqual({
      id: null,
      name: '',
      description: '',
      quantity: null,
    });

    expect(modalClose).toHaveBeenCalledWith('inventoried 5b3c87c9-81a7-411e-b55a-8486ba065b4b');
  }));

  it('should throw error on inventory of order (1/3)', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.inventoryOrderForm.controls['itemName'].setValue('Fantastic Wooden Soap');
    component.inventoryOrderForm.controls['itemName'].markAsDirty();
    component.order.id = '5b3c87c9-81a7-411e-b55a-8486ba065b4b';
    component.order.quantity = 10;

    component.inventoryOrder();
    tick();

    expect(component.errorMessage).toEqual('Order not Found.');

    expect(component.inventoryItem).toEqual({
      id: "920b8cc7-364f-4255-9540-09093f1e167a",
      name: "Fantastic Concrete Pizza",
      description: "Cum exercitationem est.",
      quantity: 49691,
    });

    localStorage.removeItem('throwError');
  }));

  it('should throw error on inventory of order (2/3)', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.inventoryOrderForm.controls['itemName'].setValue('Fantastic Metal Soap');
    component.inventoryOrderForm.controls['itemName'].markAsDirty();
    component.order.id = '5b3c87c9-81a7-411e-b55a-8486ba065b4b';
    component.order.quantity = 10;

    component.inventoryOrder();
    tick();

    expect(component.errorMessage).toEqual('Order not Found.');
    expect(component.inventoryItem).toEqual({
      id: null,
      name: '',
      description: '',
      quantity: null,
    });

    localStorage.removeItem('throwError');
  }));

  it('should throw error on inventory of order (3/3)', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.inventoryOrderForm.controls['itemName'].setValue('Fantastic Error Soap');
    component.inventoryOrderForm.controls['itemName'].markAsDirty();
    component.order.id = '5b3c87c9-81a7-411e-b55a-8486ba065b4b';
    component.order.quantity = 10;

    component.inventoryOrder();
    tick();

    expect(component.errorMessage).toEqual('Internal Server Error.');
    expect(component.inventoryItem).toEqual({
      id: null,
      name: '',
      description: '',
      quantity: null,
    });

    localStorage.removeItem('throwError');
  }));
});
