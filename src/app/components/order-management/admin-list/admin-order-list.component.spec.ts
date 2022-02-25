import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

import { AdminOrderListComponent } from './admin-order-list.component';

import { OrderService } from "../../../services/order.service";

import { Order } from "../../../types/order";
import { PagedResponse } from "../../../types/paged-response";

class MockOrderService {
  public getAllPendingOrders(limit: number = 0, offset: number = 0): Observable<PagedResponse<Order>> {
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
        "total": 5,
        "data": [{
          "id": "b69537c7-9d6b-491a-bd24-1c5019d18e03",
          "itemName": null,
          "status": 1,
          "quantity": 42,
          "url": "amazon.com",
          "user": {
            "id": "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
            "email": "visitor@test.com",
            "firstName": "Visitor",
            "lastName": "Visitor",
            "role": 2,
            "emailVerification": true,
            "isActiveDirectory": false,
            "notificationChannel": 3
          },
          "item": {
            "id": "5b3c87c9-81a7-411e-b55a-8486ba065b4b",
            "name": "Fantastic Steel Soap",
            "description": "Distinctio iste et est tenetur officiis quis.",
            "quantity": 40424
          }
        }, {
          "id": "40ecc367-e0a9-4f57-8fe4-4d56b2e0184b",
          "itemName": "Awesome Granite Towels",
          "status": 1,
          "quantity": 42962,
          "url": "https://clementine.biz",
          "user": {
            "id": "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
            "email": "visitor@test.com",
            "firstName": "Visitor",
            "lastName": "Visitor",
            "role": 2,
            "emailVerification": true,
            "isActiveDirectory": false,
            "notificationChannel": 3
          },
          "item": null
        }, {
          "id": "f3e34073-2b2b-434d-b2c8-9498070bad2d",
          "itemName": null,
          "status": 1,
          "quantity": 34570,
          "url": "https://otis.org",
          "user": {
            "id": "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
            "email": "visitor@test.com",
            "firstName": "Visitor",
            "lastName": "Visitor",
            "role": 2,
            "emailVerification": true,
            "isActiveDirectory": false,
            "notificationChannel": 3
          },
          "item": {
            "id": "5b3c87c9-81a7-411e-b55a-8486ba065b4b",
            "name": "Fantastic Steel Soap",
            "description": "Distinctio iste et est tenetur officiis quis.",
            "quantity": 40424
          }
        }]
      });
    });
  }

  public getAllAcceptedOrders(limit: number = 0, offset: number = 0): Observable<PagedResponse<Order>> {
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
        "total": 10,
        "data": [{
          "id": "409e615a-5ba6-4e23-9b8b-7969a3ab4b70",
          "itemName": "Incredible Frozen Car",
          "status": 4,
          "quantity": 37188,
          "url": "https://alan.org",
          "user": {
            "id": "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
            "email": "visitor@test.com",
            "firstName": "Visitor",
            "lastName": "Visitor",
            "role": 2,
            "emailVerification": true,
            "isActiveDirectory": false,
            "notificationChannel": 3
          },
          "item": null
        }, {
          "id": "3c764b80-1502-4900-8f97-dbd26f4eee0a",
          "itemName": null,
          "status": 3,
          "quantity": 22813,
          "url": "http://mabelle.info",
          "user": {
            "id": "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
            "email": "visitor@test.com",
            "firstName": "Visitor",
            "lastName": "Visitor",
            "role": 2,
            "emailVerification": true,
            "isActiveDirectory": false,
            "notificationChannel": 3
          },
          "item": {
            "id": "3c08883c-d61e-4a9f-8967-64f83847acdc",
            "name": "Generic Steel Table",
            "description": "Labore incidunt error nihil nihil ipsam alias deserunt soluta.",
            "quantity": 44900
          }
        }, {
          "id": "4838b988-2a95-43b3-8569-da5716dd17dc",
          "itemName": null,
          "status": 4,
          "quantity": 37648,
          "url": "https://anibal.info",
          "user": {
            "id": "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
            "email": "visitor@test.com",
            "firstName": "Visitor",
            "lastName": "Visitor",
            "role": 2,
            "emailVerification": true,
            "isActiveDirectory": false,
            "notificationChannel": 3
          },
          "item": {
            "id": "52f0f2eb-69ec-4ba6-a70d-ee513d1de8d9",
            "name": "Generic Granite Table",
            "description": "In quis et ad nihil culpa asperiores.",
            "quantity": 8117
          }
        }]
      });
    });
  }

  public getAllDeclinedOrders(limit: number = 0, offset: number = 0): Observable<PagedResponse<Order>> {
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
        "total": 4,
        "data": [{
          "id": "66134a8d-6819-44d9-8d92-2aadccd993d1",
          "itemName": "Gorgeous Frozen Tuna",
          "status": 2,
          "quantity": 94823,
          "url": "http://annamae.name",
          "user": {
            "id": "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
            "email": "visitor@test.com",
            "firstName": "Visitor",
            "lastName": "Visitor",
            "role": 2,
            "emailVerification": true,
            "isActiveDirectory": false,
            "notificationChannel": 3
          },
          "item": null
        }, {
          "id": "522d408c-e773-49b9-8138-8c19f1a893f6",
          "itemName": "Sleek Wooden Bike",
          "status": 2,
          "quantity": 48899,
          "url": "http://marcelo.net",
          "user": {
            "id": "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
            "email": "visitor@test.com",
            "firstName": "Visitor",
            "lastName": "Visitor",
            "role": 2,
            "emailVerification": true,
            "isActiveDirectory": false,
            "notificationChannel": 3
          },
          "item": null
        }, {
          "id": "afa6c271-47f3-458c-9296-548d1e54df17",
          "itemName": "Gorgeous Metal Chair",
          "status": 2,
          "quantity": 17581,
          "url": "https://ron.org",
          "user": {
            "id": "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
            "email": "visitor@test.com",
            "firstName": "Visitor",
            "lastName": "Visitor",
            "role": 2,
            "emailVerification": true,
            "isActiveDirectory": false,
            "notificationChannel": 3
          },
          "item": null
        }]
      });
    });
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

describe('AdminOrderListComponent', () => {
  let component: AdminOrderListComponent;
  let fixture: ComponentFixture<AdminOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdminOrderListComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: OrderService, useClass: MockOrderService },
        { provide: NgbModal, useClass: MockModalService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminOrderListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw error on page init', () => {
    localStorage.setItem('throwError', 'true');

    expect(component.pendingOrders.pageSize).toEqual(environment.defaultPageSize);
    expect(component.acceptedOrders.pageSize).toEqual(environment.defaultPageSize);
    expect(component.declinedOrders.pageSize).toEqual(environment.defaultPageSize);

    component.ngOnInit();

    expect(component.pendingOrders.pageSize).toEqual(3);
    expect(component.acceptedOrders.pageSize).toEqual(3);
    expect(component.declinedOrders.pageSize).toEqual(3);

    localStorage.removeItem('throwError');
  });

  it('should open order create form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'created 045fcd70-d323-4de2-894e-a10772b23457');

    const updatePageMethod = spyOn(component, 'updatePage');

    component.openOrderCreationForm();

    tick();

    expect(updatePageMethod).toHaveBeenCalledWith();

    localStorage.removeItem('returnVal');
  }));

  it('should open order edit form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'edited');

    const updatePageMethod = spyOn(component, 'updatePage');

    component.openOrderEditForm('045fcd70-d323-4de2-894e-a10772b23457');

    tick();

    expect(updatePageMethod).toHaveBeenCalledWith();

    localStorage.removeItem('returnVal');
  }));

  it('should open order deletion form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    component.openOrderDeletionDialog('045fcd70-d323-4de2-894e-a10772b23457');

    tick();

    localStorage.removeItem('returnVal');
  }));

  it('should open order accept dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'accepted');

    const updatePageMethod = spyOn(component, 'updatePage');

    component.openOrderAcceptDialog('045fcd70-d323-4de2-894e-a10772b23457');

    tick();

    expect(updatePageMethod).toHaveBeenCalledWith();

    localStorage.removeItem('returnVal');
  }));

  it('should open order decline dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'declined');

    const updatePageMethod = spyOn(component, 'updatePage');

    component.openOrderDeclineDialog('045fcd70-d323-4de2-894e-a10772b23457');

    tick();

    expect(updatePageMethod).toHaveBeenCalledWith();

    localStorage.removeItem('returnVal');
  }));

  it('should open inventory order form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'inventoried 045fcd70-d323-4de2-894e-a10772b23457');

    const getAcceptedOrdersMethod = spyOn(component, 'getAcceptedOrders');

    component.openInventoryOrderForm('045fcd70-d323-4de2-894e-a10772b23457');

    tick();

    expect(getAcceptedOrdersMethod).toHaveBeenCalledWith(1);

    localStorage.removeItem('returnVal');
  }));

  it('should return inventory item name', () => {
    expect(component.getItemName({
      "id": "b69537c7-9d6b-491a-bd24-1c5019d18e03",
      "itemName": null,
      "status": 1,
      "quantity": 42,
      "url": "amazon.com",
      "user": {
        "id": "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
        "email": "visitor@test.com",
        "firstName": "Visitor",
        "lastName": "Visitor",
        "role": 2,
        "emailVerification": true,
        "isActiveDirectory": false,
        "notificationChannel": 3
      },
      "item": {
        "id": "5b3c87c9-81a7-411e-b55a-8486ba065b4b",
        "name": "Fantastic Steel Soap",
        "description": "Distinctio iste et est tenetur officiis quis.",
        "quantity": 40424
      }
    })).toBe('Fantastic Steel Soap');

    expect(component.getItemName({
      "id": "409e615a-5ba6-4e23-9b8b-7969a3ab4b70",
      "itemName": "Incredible Frozen Car",
      "status": 4,
      "quantity": 37188,
      "url": "https://alan.org",
      "user": {
        "id": "1ea02546-5fd3-4cff-8ebf-b57dfe30d906",
        "email": "visitor@test.com",
        "firstName": "Visitor",
        "lastName": "Visitor",
        "role": 2,
        "emailVerification": true,
        "isActiveDirectory": false,
        "notificationChannel": 3
      },
      "item": null
    })).toBe('Incredible Frozen Car');
  });
});
