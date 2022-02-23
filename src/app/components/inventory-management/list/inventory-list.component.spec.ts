import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { Observable } from "rxjs";

import { InventoryListComponent } from './inventory-list.component';

import { InventoryService } from "../../../services/inventory.service";

import { InventoryItem } from "../../../types/inventory-item";
import { PagedList } from "../../../types/paged-list";
import { PagedResponse } from "../../../types/paged-response";

class MockInventoryService {
  getInventoryItems(limit: number = 0, offset: number = 0): Observable<PagedResponse<InventoryItem>> {
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
  public requestOrderForm: FormGroup = new FormGroup({
    itemName: new FormControl('', [
      Validators.required,
    ]),
    quantity: new FormControl(null,[
      Validators.required,
      Validators.min(1),
    ]),
    url: new FormControl('', [
      Validators.required,
    ]),
  });
  open(): { componentInstance: { inventoryItem: { id: string|null }, requestOrderForm: FormGroup }, result: Promise<string> } {
    return {
      componentInstance: {
        inventoryItem: { id: null },
        requestOrderForm: this.requestOrderForm,
      },
      result: new Promise<string>(resolve =>  resolve(localStorage.getItem('returnVal') ?? 'aborted')),
    };
  };
}

describe('InventoryListComponent', () => {
  let component: InventoryListComponent;
  let fixture: ComponentFixture<InventoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InventoryListComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: InventoryService, useClass: MockInventoryService },
        { provide: NgbModal, useClass: MockModalService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page', () => {
    let pagedList = new PagedList<InventoryItem>();
    expect(component.inventory).toEqual(pagedList);

    component.ngOnInit();

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
    expect(component.inventory).toEqual(pagedList);
  });

  it('should throw error on page init', () => {
    localStorage.setItem('throwError', 'true');

    let pagedList = new PagedList<InventoryItem>();
    expect(component.inventory).toEqual(pagedList);

    component.ngOnInit();

    expect(component.inventory).toEqual(pagedList);

    localStorage.removeItem('throwError');
  });

  it('should open inventory item creation form and then inventory item view', fakeAsync(() => {
    localStorage.setItem('returnVal', 'created 920b8cc7-364f-4255-9540-09093f1e167a');

    const openViewModal = spyOn(component, 'openInventoryItemViewForm');

    component.openInventoryItemCreationForm();

    tick();

    expect(openViewModal).toHaveBeenCalledWith('920b8cc7-364f-4255-9540-09093f1e167a');

    localStorage.removeItem('returnVal');
  }));

  it('should open order creation form and then inventory item view', fakeAsync(() => {
    localStorage.setItem('returnVal', 'created "045fcd70-d323-4de2-894e-a10772b23457"');

    const openViewModal = spyOn(component, 'openInventoryItemViewForm');

    component.openOrderCreationForm("Fantastic Concrete Pizza", "045fcd70-d323-4de2-894e-a10772b23457");

    tick();

    expect(openViewModal).toHaveBeenCalledWith("045fcd70-d323-4de2-894e-a10772b23457");

    localStorage.removeItem('returnVal');
  }));

  it('should open inventory item view', fakeAsync(() => {
    localStorage.setItem('returnVal', 'dirty');

    const getInventoryMethod = spyOn(component, 'getInventory');

    component.openInventoryItemViewForm('920b8cc7-364f-4255-9540-09093f1e167a');

    tick();

    expect(getInventoryMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should open inventory item edit form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'edited');

    const getInventoryMethod = spyOn(component, 'getInventory');

    component.openInventoryItemEditForm('920b8cc7-364f-4255-9540-09093f1e167a');

    tick();

    expect(getInventoryMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should open inventory item deletion form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    const getInventoryMethod = spyOn(component, 'getInventory');

    component.openItemDeletionDialog('920b8cc7-364f-4255-9540-09093f1e167a');

    tick();

    expect(getInventoryMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));
});
