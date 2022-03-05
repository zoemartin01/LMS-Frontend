import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";

import {OrderEditComponent} from './order-edit.component';
import {
  WhitelistRetailerUserListComponent
} from "../whitelist-retailer-user-list/whitelist-retailer-user-list.component";

import {AdminService} from "../../../services/admin.service";
import {AuthService} from "../../../services/auth.service";
import {InventoryService} from "../../../services/inventory.service";
import {OrderService} from "../../../services/order.service";

import {Order} from "../../../types/order";
import {OrderId} from "../../../types/aliases/order-id";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {OrderStatus} from "../../../types/enums/order-status";
import {InventoryItem} from "../../../types/inventory-item";
import {PagedResponse} from "../../../types/paged-response";
import {PagedList} from "../../../types/paged-list";

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

  updateOrderData(orderId: OrderId, changedData: object): Observable<Order> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Inventory Item not Found.',
          }
        });
      }

      observer.next({
        id: "045fcd70-d323-4de2-894e-a10772b23457",
        itemName: "Fantastic Wooden Soap",
        status: 2,
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
        item: null,
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
            message: 'Internal Server Error.',
          }
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
}

class MockAuthService {
  isAdmin(): boolean {
    return false;
  }
}

class MockModalService {
  open(): {} {
    return {};
  };
}

class MockAdminService {
  checkDomainAgainstWhitelist(domain: string): Observable<{ isWhitelisted: boolean }> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Internal Server Error.',
            }
          }
        });
      }

      observer.next({
        isWhitelisted: false
      });
    });
  }
}

describe('OrderEditComponent', () => {
  let component: OrderEditComponent;
  let fixture: ComponentFixture<OrderEditComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OrderEditComponent,
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
      ],
      providers: [
        {provide: OrderService, useClass: MockOrderService},
        {provide: InventoryService, useClass: MockInventoryService},
        {provide: AuthService, useClass: MockAuthService},
        {provide: AdminService, useClass: MockAdminService},
        {provide: NgbModal, useClass: MockModalService},
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderEditComponent);
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
    expect(component.existingItems).toEqual([]);

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
    expect(component.existingItems).toEqual([
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
    ]);

    expect(component.orderEditForm.controls['itemName'].value).toBe('Fantastic Concrete Pizza');
    expect(component.orderEditForm.controls['quantity'].value).toBe(10);
    expect(component.orderEditForm.controls['url'].value).toBe('conrad.de/pizza');
    expect(component.orderEditForm.controls['status'].value).toBe(3);
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
    expect(component.existingItems).toEqual([]);

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
    expect(component.existingItems).toEqual([
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
    ]);

    expect(component.orderEditForm.controls['itemName'].value).toBe('Awesome Granite Towels');
    expect(component.orderEditForm.controls['quantity'].value).toBe(42962);
    expect(component.orderEditForm.controls['url'].value).toBe('https://clementine.biz');
    expect(component.orderEditForm.controls['status'].value).toBe(1);
  }));

  it('should throw error on page init', () => {
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
    expect(component.existingItems).toEqual([]);

    component.order.id = "045fcd70-d323-4de2-894e-a10772b23457";

    component.ngOnInit();

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
    expect(component.existingItems).toEqual([]);

    expect(component.orderEditForm.controls['itemName'].value).toBe('');
    expect(component.orderEditForm.controls['quantity'].value).toBe(0);
    expect(component.orderEditForm.controls['url'].value).toBe('');
    expect(component.orderEditForm.controls['status'].value).toBe(0);

    localStorage.removeItem('throwError');
  });

  it('should check url against retailer whitelist', () => {
    expect(component.isWhitelisted).toBeTrue();

    component.orderEditForm.controls['url'].setValue('konrad.com');

    component.checkUrlAgainstWhitelistedRetailers();

    expect(component.isWhitelisted).toBeFalse();
  });

  it('should throw error when checking url against retailer whitelist', () => {
    localStorage.setItem('throwError', 'true');

    expect(component.isWhitelisted).toBeTrue();

    component.orderEditForm.controls['url'].setValue('konrad.com');

    component.checkUrlAgainstWhitelistedRetailers();

    expect(consoleError).toHaveBeenCalled();
    expect(component.isWhitelisted).toBeTrue();

    localStorage.removeItem('throwError');
  });

  it('should open whitelist retailer list', () => {
    let openModal = spyOn(component.modalService, 'open');

    component.openWhitelistRetailerList();

    expect(openModal).toHaveBeenCalledWith(WhitelistRetailerUserListComponent);
  });

  it('should edit order', fakeAsync(() => {
    component.order.id = "5b3c87c9-81a7-411e-b55a-8486ba065b4b";
    component.orderEditForm.controls['itemName'].setValue('Fantastic Wooden Soap');
    component.orderEditForm.controls['itemName'].markAsDirty();
    component.orderEditForm.controls['status'].setValue('2');
    component.orderEditForm.controls['status'].markAsDirty();
    component.orderEditForm.controls['quantity'].setValue('20');
    component.orderEditForm.controls['quantity'].markAsDirty();
    component.orderEditForm.controls['url'].setValue('amazon.notcom');
    component.orderEditForm.controls['url'].markAsDirty();

    const modalClose = spyOn(component.activeModal, 'close');

    component.editOrder();
    tick();

    expect(modalClose).toHaveBeenCalledWith('edited');
  }));

  it('should throw error on edit of order', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');
    component.order.id = "5b3c87c9-81a7-411e-b55a-8486ba065b4bNotExistent";
    component.orderEditForm.controls['itemName'].setValue('Fantastic Wooden Soap');
    component.orderEditForm.controls['itemName'].markAsDirty();
    component.orderEditForm.controls['status'].setValue('2');
    component.orderEditForm.controls['status'].markAsDirty();
    component.orderEditForm.controls['quantity'].setValue('20');
    component.orderEditForm.controls['quantity'].markAsDirty();
    component.orderEditForm.controls['url'].setValue('amazon.notcom');
    component.orderEditForm.controls['url'].markAsDirty();

    component.editOrder();
    tick();

    expect(component.errorMessage).toEqual('Inventory Item not Found.')

    localStorage.removeItem('throwError');
  }));

  it('should throw error on edit of order when input invalid', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.order.id = "5b3c87c9-81a7-411e-b55a-8486ba065b4b";
    component.orderEditForm.controls['itemName'].setValue('Fantastic Wooden Soap');
    component.orderEditForm.controls['itemName'].markAsDirty();
    component.orderEditForm.controls['status'].setValue('2');
    component.orderEditForm.controls['status'].markAsDirty();

    component.editOrder();
    tick();
    expect(component.errorMessage).toEqual('You need to fill in all required fields!');

    localStorage.removeItem('throwError');
  }));
});
