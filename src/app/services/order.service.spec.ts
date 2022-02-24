import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ParseArgumentException } from "@angular/cli/models/parser";
import { environment } from "../../environments/environment";

import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all pending orders', () => {
    service.getAllPendingOrders().subscribe(
      res => {
        expect(res).toEqual({
          "total": 6,
          "data": [{
            "id": "045fcd70-d323-4de2-894e-a10772b23457",
            "itemName": null,
            "status": 1,
            "quantity": 10,
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
              "id": "920b8cc7-364f-4255-9540-09093f1e167a",
              "name": "Fantastic Concrete Pizza",
              "description": "Cum exercitationem est.",
              "quantity": 49691
            }
          }, {
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
          }]
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.orders.getAllPendingOrders}` +
      `?limit=0&offset=0`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      "total": 6,
      "data": [{
        "id": "045fcd70-d323-4de2-894e-a10772b23457",
        "itemName": null,
        "status": 1,
        "quantity": 10,
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
          "id": "920b8cc7-364f-4255-9540-09093f1e167a",
          "name": "Fantastic Concrete Pizza",
          "description": "Cum exercitationem est.",
          "quantity": 49691
        }
      }, {
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
      }]
    });
  });

  it('should get all accepted orders', () => {
    service.getAllAcceptedOrders().subscribe(
      res => {
        expect(res).toEqual({
          "total": 12,
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
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.orders.getAllAcceptedOrders}` +
      `?limit=0&offset=0`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      "total": 12,
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

  it('should get all declined orders', () => {
    service.getAllDeclinedOrders().subscribe(
      res => {
        expect(res).toEqual({
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
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.orders.getAllDeclinedOrders}` +
      `?limit=0&offset=0`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
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

  it('should get all pending orders for current user', () => {
    service.getAllPendingOrdersForCurrentUser().subscribe(
      res => {
        expect(res).toEqual({
          "total": 2,
          "data": [{
            "id": "6569a551-24cb-4a29-9adf-f90d036c6df7",
            "itemName": "Gorgeous Cotton Car",
            "status": 1,
            "quantity": 18105,
            "url": "http://misael.net",
            "user": {
              "id": "43984ebf-a4b7-4d81-bba6-0bcb72cd9bbf",
              "email": "admin@test.com",
              "firstName": "Admin",
              "lastName": "Admin",
              "role": 3,
              "emailVerification": true,
              "isActiveDirectory": false,
              "notificationChannel": 3
            },
            "item": null
          }, {
            "id": "552abe0b-4e2e-4a5c-ace6-907defde2852",
            "itemName": null,
            "status": 1,
            "quantity": 35701,
            "url": "http://jordane.com",
            "user": {
              "id": "43984ebf-a4b7-4d81-bba6-0bcb72cd9bbf",
              "email": "admin@test.com",
              "firstName": "Admin",
              "lastName": "Admin",
              "role": 3,
              "emailVerification": true,
              "isActiveDirectory": false,
              "notificationChannel": 3
            },
            "item": {
              "id": "35430ae2-11d2-4d30-adb1-5fb8d15a0175",
              "name": "Rustic Plastic Fish",
              "description": "In natus repudiandae enim architecto.",
              "quantity": 50447
            }
          }]
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.orders.getCurrentUsersPendingOrders}` +
      `?limit=0&offset=0`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      "total": 2,
      "data": [{
        "id": "6569a551-24cb-4a29-9adf-f90d036c6df7",
        "itemName": "Gorgeous Cotton Car",
        "status": 1,
        "quantity": 18105,
        "url": "http://misael.net",
        "user": {
          "id": "43984ebf-a4b7-4d81-bba6-0bcb72cd9bbf",
          "email": "admin@test.com",
          "firstName": "Admin",
          "lastName": "Admin",
          "role": 3,
          "emailVerification": true,
          "isActiveDirectory": false,
          "notificationChannel": 3
        },
        "item": null
      }, {
        "id": "552abe0b-4e2e-4a5c-ace6-907defde2852",
        "itemName": null,
        "status": 1,
        "quantity": 35701,
        "url": "http://jordane.com",
        "user": {
          "id": "43984ebf-a4b7-4d81-bba6-0bcb72cd9bbf",
          "email": "admin@test.com",
          "firstName": "Admin",
          "lastName": "Admin",
          "role": 3,
          "emailVerification": true,
          "isActiveDirectory": false,
          "notificationChannel": 3
        },
        "item": {
          "id": "35430ae2-11d2-4d30-adb1-5fb8d15a0175",
          "name": "Rustic Plastic Fish",
          "description": "In natus repudiandae enim architecto.",
          "quantity": 50447
        }
      }]
    });
  });

  it('should get all accepted orders for current user', () => {
    service.getAllAcceptedOrdersForCurrentUser().subscribe(
      res => {
        expect(res).toEqual({
          "total": 7,
          "data": [{
            "id": "5877b9e0-3c60-48f0-acbb-0478bb612160",
            "itemName": null,
            "status": 5,
            "quantity": 50356,
            "url": "http://litzy.info",
            "user": {
              "id": "43984ebf-a4b7-4d81-bba6-0bcb72cd9bbf",
              "email": "admin@test.com",
              "firstName": "Admin",
              "lastName": "Admin",
              "role": 3,
              "emailVerification": true,
              "isActiveDirectory": false,
              "notificationChannel": 3
            },
            "item": {
              "id": "920b8cc7-364f-4255-9540-09093f1e167a",
              "name": "Fantastic Concrete Pizza",
              "description": "Cum exercitationem est.",
              "quantity": 49691
            }
          }, {
            "id": "df24bc01-6a59-43b2-844a-74e08b578787",
            "itemName": null,
            "status": 4,
            "quantity": 13154,
            "url": "https://ephraim.biz",
            "user": {
              "id": "43984ebf-a4b7-4d81-bba6-0bcb72cd9bbf",
              "email": "admin@test.com",
              "firstName": "Admin",
              "lastName": "Admin",
              "role": 3,
              "emailVerification": true,
              "isActiveDirectory": false,
              "notificationChannel": 3
            },
            "item": {
              "id": "920b8cc7-364f-4255-9540-09093f1e167a",
              "name": "Fantastic Concrete Pizza",
              "description": "Cum exercitationem est.",
              "quantity": 49691
            }
          }, {
            "id": "e5d4b865-9ae6-4057-a6ee-9eaad664060c",
            "itemName": null,
            "status": 4,
            "quantity": 59189,
            "url": "https://armand.name",
            "user": {
              "id": "43984ebf-a4b7-4d81-bba6-0bcb72cd9bbf",
              "email": "admin@test.com",
              "firstName": "Admin",
              "lastName": "Admin",
              "role": 3,
              "emailVerification": true,
              "isActiveDirectory": false,
              "notificationChannel": 3
            },
            "item": {
              "id": "11748038-02e8-4067-9d94-01c375f2bc7d",
              "name": "Refined Fresh Chair",
              "description": "Labore sunt dicta ullam placeat sint consequuntur consectetur ea temporibus.",
              "quantity": 9075
            }
          }]
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.orders.getCurrentUsersAcceptedOrders}` +
      `?limit=0&offset=0`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      "total": 7,
      "data": [{
        "id": "5877b9e0-3c60-48f0-acbb-0478bb612160",
        "itemName": null,
        "status": 5,
        "quantity": 50356,
        "url": "http://litzy.info",
        "user": {
          "id": "43984ebf-a4b7-4d81-bba6-0bcb72cd9bbf",
          "email": "admin@test.com",
          "firstName": "Admin",
          "lastName": "Admin",
          "role": 3,
          "emailVerification": true,
          "isActiveDirectory": false,
          "notificationChannel": 3
        },
        "item": {
          "id": "920b8cc7-364f-4255-9540-09093f1e167a",
          "name": "Fantastic Concrete Pizza",
          "description": "Cum exercitationem est.",
          "quantity": 49691
        }
      }, {
        "id": "df24bc01-6a59-43b2-844a-74e08b578787",
        "itemName": null,
        "status": 4,
        "quantity": 13154,
        "url": "https://ephraim.biz",
        "user": {
          "id": "43984ebf-a4b7-4d81-bba6-0bcb72cd9bbf",
          "email": "admin@test.com",
          "firstName": "Admin",
          "lastName": "Admin",
          "role": 3,
          "emailVerification": true,
          "isActiveDirectory": false,
          "notificationChannel": 3
        },
        "item": {
          "id": "920b8cc7-364f-4255-9540-09093f1e167a",
          "name": "Fantastic Concrete Pizza",
          "description": "Cum exercitationem est.",
          "quantity": 49691
        }
      }, {
        "id": "e5d4b865-9ae6-4057-a6ee-9eaad664060c",
        "itemName": null,
        "status": 4,
        "quantity": 59189,
        "url": "https://armand.name",
        "user": {
          "id": "43984ebf-a4b7-4d81-bba6-0bcb72cd9bbf",
          "email": "admin@test.com",
          "firstName": "Admin",
          "lastName": "Admin",
          "role": 3,
          "emailVerification": true,
          "isActiveDirectory": false,
          "notificationChannel": 3
        },
        "item": {
          "id": "11748038-02e8-4067-9d94-01c375f2bc7d",
          "name": "Refined Fresh Chair",
          "description": "Labore sunt dicta ullam placeat sint consequuntur consectetur ea temporibus.",
          "quantity": 9075
        }
      }]
    });
  });

  it('should get all declined orders for current user', () => {
    service.getAllDeclinedOrdersForCurrentUser().subscribe(
      res => {
        expect(res).toEqual({
          "total": 1,
          "data": [{
            "id": "895e6e36-bcbc-487a-8beb-55f3efede70c",
            "itemName": null,
            "status": 2,
            "quantity": 48303,
            "url": "https://lorena.name",
            "user": {
              "id": "43984ebf-a4b7-4d81-bba6-0bcb72cd9bbf",
              "email": "admin@test.com",
              "firstName": "Admin",
              "lastName": "Admin",
              "role": 3,
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
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.orders.getCurrentUsersDeclinedOrders}` +
      `?limit=0&offset=0`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      "total": 1,
      "data": [{
        "id": "895e6e36-bcbc-487a-8beb-55f3efede70c",
        "itemName": null,
        "status": 2,
        "quantity": 48303,
        "url": "https://lorena.name",
        "user": {
          "id": "43984ebf-a4b7-4d81-bba6-0bcb72cd9bbf",
          "email": "admin@test.com",
          "firstName": "Admin",
          "lastName": "Admin",
          "role": 3,
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

  it('should get order data', () => {
    service.getOrderData("045fcd70-d323-4de2-894e-a10772b23457").subscribe(
      res => {
        expect(res).toEqual({
          "id": "045fcd70-d323-4de2-894e-a10772b23457",
          "itemName": null,
          "status": 1,
          "quantity": 10,
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
            "id": "920b8cc7-364f-4255-9540-09093f1e167a",
            "name": "Fantastic Concrete Pizza",
            "description": "Cum exercitationem est.",
            "quantity": 49691
          }
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.orders.getSingleOrder
      .replace(':id', "045fcd70-d323-4de2-894e-a10772b23457")}`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      "id": "045fcd70-d323-4de2-894e-a10772b23457",
      "itemName": null,
      "status": 1,
      "quantity": 10,
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
        "id": "920b8cc7-364f-4255-9540-09093f1e167a",
        "name": "Fantastic Concrete Pizza",
        "description": "Cum exercitationem est.",
        "quantity": 49691
      }
    });
  });

  it('should throw exception when trying to get an order with id null', () => {
    expect(() => service.getOrderData(null)).toThrow(ParseArgumentException);
  });

  it('should request an order', () => {
    service.requestOrder(
      "Fantastic Concrete Pizza",
      10,
      "amazon.com")
      .subscribe(
        res => {
          expect(res).toEqual({
            "id": "045fcd70-d323-4de2-894e-a10772b23457",
            "itemName": null,
            "status": 1,
            "quantity": 10,
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
              "id": "920b8cc7-364f-4255-9540-09093f1e167a",
              "name": "Fantastic Concrete Pizza",
              "description": "Cum exercitationem est.",
              "quantity": 49691
            }
          });
        }
      );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.orders.createOrder}`);

    expect(mockRequest.request.method).toBe('POST');

    mockRequest.flush({
      "id": "045fcd70-d323-4de2-894e-a10772b23457",
      "itemName": null,
      "status": 1,
      "quantity": 10,
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
        "id": "920b8cc7-364f-4255-9540-09093f1e167a",
        "name": "Fantastic Concrete Pizza",
        "description": "Cum exercitationem est.",
        "quantity": 49691
      }
    });
  });

  it('should edit an order', () => {
    service.updateOrderData("045fcd70-d323-4de2-894e-a10772b23457", {
      url: "conrad.de/pizza",
    })
      .subscribe(
        res => {
          expect(res).toEqual({
            "id": "045fcd70-d323-4de2-894e-a10772b23457",
            "itemName": null,
            "status": 1,
            "quantity": 10,
            "url": "conrad.de/pizza",
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
              "id": "920b8cc7-364f-4255-9540-09093f1e167a",
              "name": "Fantastic Concrete Pizza",
              "description": "Cum exercitationem est.",
              "quantity": 49691
            }
          });
        }
      );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.orders.updateOrder
      .replace(':id', "045fcd70-d323-4de2-894e-a10772b23457")}`);

    expect(mockRequest.request.method).toBe('PATCH');

    mockRequest.flush({
      "id": "045fcd70-d323-4de2-894e-a10772b23457",
      "itemName": null,
      "status": 1,
      "quantity": 10,
      "url": "conrad.de/pizza",
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
        "id": "920b8cc7-364f-4255-9540-09093f1e167a",
        "name": "Fantastic Concrete Pizza",
        "description": "Cum exercitationem est.",
        "quantity": 49691
      }
    });
  });

  it('should accept an order', () => {
    service.acceptOrderRequest("045fcd70-d323-4de2-894e-a10772b23457")
      .subscribe(
        res => {
          expect(res).toEqual({
            "id": "045fcd70-d323-4de2-894e-a10772b23457",
            "itemName": null,
            "status": 2,
            "quantity": 10,
            "url": "conrad.de/pizza",
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
              "id": "920b8cc7-364f-4255-9540-09093f1e167a",
              "name": "Fantastic Concrete Pizza",
              "description": "Cum exercitationem est.",
              "quantity": 49691
            }
          });
        }
      );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.orders.updateOrder
      .replace(':id', "045fcd70-d323-4de2-894e-a10772b23457")}`);

    expect(mockRequest.request.method).toBe('PATCH');

    mockRequest.flush({
      "id": "045fcd70-d323-4de2-894e-a10772b23457",
      "itemName": null,
      "status": 2,
      "quantity": 10,
      "url": "conrad.de/pizza",
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
        "id": "920b8cc7-364f-4255-9540-09093f1e167a",
        "name": "Fantastic Concrete Pizza",
        "description": "Cum exercitationem est.",
        "quantity": 49691
      }
    });
  });

  it('should decline an order', () => {
    service.declineOrderRequest("045fcd70-d323-4de2-894e-a10772b23457")
      .subscribe(
        res => {
          expect(res).toEqual({
            "id": "045fcd70-d323-4de2-894e-a10772b23457",
            "itemName": null,
            "status": 3,
            "quantity": 10,
            "url": "conrad.de/pizza",
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
              "id": "920b8cc7-364f-4255-9540-09093f1e167a",
              "name": "Fantastic Concrete Pizza",
              "description": "Cum exercitationem est.",
              "quantity": 49691
            }
          });
        }
      );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.orders.updateOrder
      .replace(':id', "045fcd70-d323-4de2-894e-a10772b23457")}`);

    expect(mockRequest.request.method).toBe('PATCH');

    mockRequest.flush({
      "id": "045fcd70-d323-4de2-894e-a10772b23457",
      "itemName": null,
      "status": 3,
      "quantity": 10,
      "url": "conrad.de/pizza",
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
        "id": "920b8cc7-364f-4255-9540-09093f1e167a",
        "name": "Fantastic Concrete Pizza",
        "description": "Cum exercitationem est.",
        "quantity": 49691
      }
    });
  });

  it('should throw exception when trying to edit an order with id null', () => {
    expect(() => service.updateOrderData(null, {
      url: "conrad.de/pizza",
    })).toThrow(ParseArgumentException);
  });

  it('should delete an order', () => {
    service.deleteOrder("045fcd70-d323-4de2-894e-a10772b23457").subscribe();

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.orders.deleteOrder
      .replace(':id', "045fcd70-d323-4de2-894e-a10772b23457")}`);

    expect(mockRequest.request.method).toBe('DELETE');

    mockRequest.flush({}, {
      status: 204,
      statusText: "No Content",
    });
  });

  it('should throw exception when trying to delete an order with id null', () => {
    expect(() => service.deleteOrder(null)).toThrow(ParseArgumentException);
  });
});
