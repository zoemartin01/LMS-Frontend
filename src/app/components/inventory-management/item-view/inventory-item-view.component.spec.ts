import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { Observable } from "rxjs";

import { InventoryItemViewComponent } from './inventory-item-view.component';

import { InventoryService } from "../../../services/inventory.service";

import { InventoryItem } from "../../../types/inventory-item";

class MockInventoryService {
  getInventoryItemData(id: string): Observable<InventoryItem> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Inventory Item not Found.',
            }
          }
        });
      }

      observer.next({
        id: "5b3c87c9-81a7-411e-b55a-8486ba065b4b",
        name: "Fantastic Steel Soap",
        description: "Distinctio iste et est tenetur officiis quis.",
        quantity: 40424,
      });
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

describe('InventoryItemViewComponent', () => {
  let component: InventoryItemViewComponent;
  let fixture: ComponentFixture<InventoryItemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InventoryItemViewComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: InventoryService, useClass: MockInventoryService },
        { provide: NgbModal, useClass: MockModalService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryItemViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page', () => {
    expect(component.inventoryItem).toEqual({
      id: null,
      name: '',
      description: '',
      quantity: null,
    });

    component.ngOnInit();

    expect(component.inventoryItem).toEqual({
      id: "5b3c87c9-81a7-411e-b55a-8486ba065b4b",
      name: "Fantastic Steel Soap",
      description: "Distinctio iste et est tenetur officiis quis.",
      quantity: 40424,
    });

    expect(component.inventoryItemViewForm.controls['name'].value).toBe('Fantastic Steel Soap');
    expect(component.inventoryItemViewForm.controls['description'].value).toBe('Distinctio iste et est tenetur officiis quis.');
    expect(component.inventoryItemViewForm.controls['quantity'].value).toBe(40424);
  });

  it('should throw error on page init', () => {
    localStorage.setItem('throwError', 'true');

    expect(component.inventoryItem).toEqual({
      id: null,
      name: '',
      description: '',
      quantity: null,
    });

    const consoleError = spyOn(console, 'error');

    component.ngOnInit();

    expect(consoleError).toHaveBeenCalled();
    expect(component.inventoryItem).toEqual({
      id: null,
      name: '',
      description: '',
      quantity: null,
    });

    expect(component.inventoryItemViewForm.controls['name'].value).toBe('');
    expect(component.inventoryItemViewForm.controls['description'].value).toBe('');
    expect(component.inventoryItemViewForm.controls['quantity'].value).toBeNull();

    localStorage.removeItem('throwError');
  });

  it('should open inventory item edit form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'edited');

    const getInventoryItemDataMethod = spyOn(component, 'getInventoryItemData');

    component.openInventoryItemEditForm();

    tick();

    expect(getInventoryItemDataMethod).toHaveBeenCalled();
    expect(component.dirty).toBeTrue();

    localStorage.removeItem('returnVal');
  }));

  it('should open inventory item deletion form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    const closeModalMethod = spyOn(component.activeModal, 'close');

    component.openInventoryItemDeletionDialog();

    tick();

    expect(closeModalMethod).toHaveBeenCalledWith('dirty');

    localStorage.removeItem('returnVal');
  }));

  it('should open order creation form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'created 045fcd70-d323-4de2-894e-a10772b23457');

    component.openOrderCreationForm();

    tick();

    localStorage.removeItem('returnVal');
  }));
});
