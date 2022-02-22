import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ParseArgumentException } from "@angular/cli/models/parser";
import { environment } from "../../environments/environment";

import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let service: InventoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(InventoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all inventory items', () => {
    service.getInventoryItems().subscribe(
      res => {
        expect(res).toEqual({
          total: 2,
          data: [
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
          ]
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.inventory_item.getAllItems}` +
      `?limit=0&offset=0`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      total: 2,
      data: [
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
      ]
    });
  });

  it('should get inventory item data', () => {
    service.getInventoryItemData("920b8cc7-364f-4255-9540-09093f1e167a").subscribe(
      res => {
        expect(res).toEqual({
          id: "920b8cc7-364f-4255-9540-09093f1e167a",
          name: "Fantastic Concrete Pizza",
          description: "Cum exercitationem est.",
          quantity: 49691,
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.inventory_item.getSingleItem
      .replace(':id', "920b8cc7-364f-4255-9540-09093f1e167a")}`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      id: "920b8cc7-364f-4255-9540-09093f1e167a",
      name: "Fantastic Concrete Pizza",
      description: "Cum exercitationem est.",
      quantity: 49691,
    });
  });

  it('should get inventory item by name', () => {
    service.getInventoryItemByName("Fantastic Concrete Pizza").subscribe(
      res => {
        expect(res).toEqual({
          id: "920b8cc7-364f-4255-9540-09093f1e167a",
          name: "Fantastic Concrete Pizza",
          description: "Cum exercitationem est.",
          quantity: 49691,
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.inventory_item.getByName
      .replace(':name', "Fantastic Concrete Pizza")}`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      id: "920b8cc7-364f-4255-9540-09093f1e167a",
      name: "Fantastic Concrete Pizza",
      description: "Cum exercitationem est.",
      quantity: 49691,
    });
  });

  it('should create an inventory item', () => {
    service.createInventoryItem(
      "Fantastic Concrete Pizza",
      "Cum exercitationem est.",
      49691)
      .subscribe(
      res => {
        expect(res).toEqual({
          id: "920b8cc7-364f-4255-9540-09093f1e167a",
          name: "Fantastic Concrete Pizza",
          description: "Cum exercitationem est.",
          quantity: 49691,
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.inventory_item.createItem}`);

    expect(mockRequest.request.method).toBe('POST');

    mockRequest.flush({
      id: "920b8cc7-364f-4255-9540-09093f1e167a",
      name: "Fantastic Concrete Pizza",
      description: "Cum exercitationem est.",
      quantity: 49691,
    });
  });

  it('should edit an inventory item', () => {
    service.editInventoryItem("920b8cc7-364f-4255-9540-09093f1e167a", {
      name: "Fantastic Plastic Pizza",
    })
      .subscribe(
        res => {
          expect(res).toEqual({
            id: "920b8cc7-364f-4255-9540-09093f1e167a",
            name: "Fantastic Plastic Pizza",
            description: "Cum exercitationem est.",
            quantity: 49691,
          });
        }
      );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.inventory_item.updateItem
      .replace(':id', "920b8cc7-364f-4255-9540-09093f1e167a")}`);

    expect(mockRequest.request.method).toBe('PATCH');

    mockRequest.flush({
      id: "920b8cc7-364f-4255-9540-09093f1e167a",
      name: "Fantastic Plastic Pizza",
      description: "Cum exercitationem est.",
      quantity: 49691,
    });
  });

  it('should throw exception when trying to edit an inventory item with id null', () => {
    expect(() => service.editInventoryItem(null, {
      name: "Fantastic Plastic Pizza",
    })).toThrow(ParseArgumentException);
  });

  it('should delete an inventory item', () => {
    service.deleteInventoryItem("920b8cc7-364f-4255-9540-09093f1e167a").subscribe();

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.inventory_item.deleteItem
      .replace(':id', "920b8cc7-364f-4255-9540-09093f1e167a")}`);

    expect(mockRequest.request.method).toBe('DELETE');

    mockRequest.flush({}, {
      status: 204,
      statusText: "No Content",
    });
  });

  it('should throw exception when trying to delete an inventory item with id null', () => {
    expect(() => service.deleteInventoryItem(null)).toThrow(ParseArgumentException);
  });
});
