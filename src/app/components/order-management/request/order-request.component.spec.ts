import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";

import {OrderRequestComponent} from './order-request.component';
import {
  WhitelistRetailerUserListComponent
} from "../whitelist-retailer-user-list/whitelist-retailer-user-list.component";

import {AdminService} from "../../../services/admin.service";
import {InventoryService} from "../../../services/inventory.service";
import {OrderService} from "../../../services/order.service";

import {Order} from "../../../types/order";
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

  public requestOrder(itemName: string, quantity: number, url: string): Observable<Order> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Internal Server Error.',
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
            message: 'Internal Server Error.',
          }
        });
      }

      observer.next({
        isWhitelisted: false
      });
    });
  }
}

describe('OrderRequestComponent', () => {
  let component: OrderRequestComponent;
  let fixture: ComponentFixture<OrderRequestComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OrderRequestComponent,
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
        {provide: AdminService, useClass: MockAdminService},
        {provide: NgbModal, useClass: MockModalService},
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderRequestComponent);
    component = fixture.componentInstance;

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page', fakeAsync(() => {
    expect(component.existingItems).toEqual([]);

    component.ngOnInit();
    tick();

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
  }));

  it('should throw error on page init', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    expect(component.existingItems).toEqual([]);

    component.ngOnInit();
    tick();

    expect(consoleError).toHaveBeenCalled();
    expect(component.existingItems).toEqual([]);

    localStorage.removeItem('throwError');
  }));

  it('should check url against retailer whitelist', fakeAsync(() => {
    expect(component.isWhitelisted).toBeTrue();

    component.requestOrderForm.controls['url'].setValue('konrad.com');

    component.checkUrlAgainstWhitelistedRetailers();
    tick();

    expect(component.isWhitelisted).toBeFalse();
  }));

  it('should throw error when checking url against retailer whitelist', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    expect(component.isWhitelisted).toBeTrue();

    component.requestOrderForm.controls['url'].setValue('konrad.com');

    component.checkUrlAgainstWhitelistedRetailers();
    tick();

    expect(consoleError).toHaveBeenCalled();
    expect(component.isWhitelisted).toBeTrue();

    localStorage.removeItem('throwError');
  }));

  it('should open whitelist retailer list', fakeAsync(() => {
    let openModal = spyOn(component.modalService, 'open');

    component.openWhitelistRetailerList();
    tick();

    expect(openModal).toHaveBeenCalledWith(WhitelistRetailerUserListComponent);
  }));

  it('should edit order', fakeAsync(() => {
    component.requestOrderForm.controls['itemName'].setValue('Fantastic Wooden Soap');
    component.requestOrderForm.controls['quantity'].setValue(2);
    component.requestOrderForm.controls['url'].setValue('konrad.com');

    const modalClose = spyOn(component.activeModal, 'close');

    component.requestOrder();
    tick();

    expect(modalClose).toHaveBeenCalledWith('created 045fcd70-d323-4de2-894e-a10772b23457');
  }));

  it('should throw error on edit of order', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.requestOrderForm.controls['itemName'].setValue('Fantastic Wooden Soap');
    component.requestOrderForm.controls['quantity'].setValue(2);
    component.requestOrderForm.controls['url'].setValue('conrad.de/pizza');

    component.requestOrder();
    tick();

    expect(component.errorMessage).toEqual('Internal Server Error.');

    localStorage.removeItem('throwError');
  }));

  it('should throw error on edit of order because of invalid data', fakeAsync(() => {
    component.requestOrderForm.controls['itemName'].setValue('Fantastic Wooden Soap');
    component.requestOrderForm.controls['quantity'].setValue('');
    component.requestOrderForm.controls['url'].setValue('conrad.de/pizza');

    component.requestOrder();
    tick();

    expect(component.errorMessage).toEqual('You need to fill in all required fields!');
  }));
});
