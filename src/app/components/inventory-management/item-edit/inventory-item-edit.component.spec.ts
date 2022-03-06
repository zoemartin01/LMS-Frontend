import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { Observable } from "rxjs";

import { InventoryItemEditComponent } from './inventory-item-edit.component';

import { InventoryService } from "../../../services/inventory.service";

import { InventoryItem } from "../../../types/inventory-item";
import { InventoryItemId } from "../../../types/aliases/inventory-item-id";

class MockInventoryService {
  getInventoryItemData(id: string): Observable<InventoryItem> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Inventory Item not Found.',
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

  editInventoryItem(id: InventoryItemId, changedData: object): Observable<InventoryItem> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Inventory Item not Found.',
          }
        });
      }

      observer.next({
        id: "5b3c87c9-81a7-411e-b55a-8486ba065b4b",
        name: "Fantastic Wooden Soap",
        description: "Distinctio iste et est tenetur officiis quis.",
        quantity: 500,
      });
    });
  }
}

describe('InventoryItemEditComponent', () => {
  let component: InventoryItemEditComponent;
  let fixture: ComponentFixture<InventoryItemEditComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InventoryItemEditComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: InventoryService, useClass: MockInventoryService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryItemEditComponent);
    component = fixture.componentInstance;

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page', fakeAsync(() => {
    component.inventoryItem.id = "5b3c87c9-81a7-411e-b55a-8486ba065b4b";

    expect(component.inventoryItem).toEqual({
      id: "5b3c87c9-81a7-411e-b55a-8486ba065b4b",
      name: '',
      description: '',
      quantity: null,
    });

    component.ngOnInit();
    tick();

    expect(component.inventoryItem).toEqual({
      id: "5b3c87c9-81a7-411e-b55a-8486ba065b4b",
      name: "Fantastic Steel Soap",
      description: "Distinctio iste et est tenetur officiis quis.",
      quantity: 40424,
    });

    expect(component.inventoryItemEditForm.controls['name'].value).toBe('Fantastic Steel Soap');
    expect(component.inventoryItemEditForm.controls['description'].value).toBe('Distinctio iste et est tenetur officiis quis.');
    expect(component.inventoryItemEditForm.controls['quantity'].value).toBe(40424);
  }));

  it('should throw error on page init', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');
    component.inventoryItem.id = "5b3c87c9-81a7-411e-b55a-8486ba065b4b";

    expect(component.inventoryItem).toEqual({
      id: "5b3c87c9-81a7-411e-b55a-8486ba065b4b",
      name: '',
      description: '',
      quantity: null,
    });

    component.ngOnInit();
    tick();

    expect(consoleError).toHaveBeenCalled();
    expect(component.inventoryItem).toEqual({
      id: "5b3c87c9-81a7-411e-b55a-8486ba065b4b",
      name: '',
      description: '',
      quantity: null,
    });

    expect(component.inventoryItemEditForm.controls['name'].value).toBe('');
    expect(component.inventoryItemEditForm.controls['description'].value).toBe('');
    expect(component.inventoryItemEditForm.controls['quantity'].value).toBeNull();

    localStorage.removeItem('throwError');
  }));

  it('should edit inventory item', fakeAsync(() => {
    component.inventoryItem.id = "5b3c87c9-81a7-411e-b55a-8486ba065b4b";
    component.inventoryItemEditForm.controls['name'].setValue('Fantastic Wooden Soap');
    component.inventoryItemEditForm.controls['name'].markAsDirty();
    component.inventoryItemEditForm.controls['quantity'].setValue('500');
    component.inventoryItemEditForm.controls['quantity'].markAsDirty();

    const modalClose = spyOn(component.activeModal, 'close');

    component.editInventoryItemData();
    tick();

    expect(modalClose).toHaveBeenCalledWith('edited');
  }));

  it('should throw invalid input error on edit of inventory item', fakeAsync(() => {
    component.inventoryItem.id = "5b3c87c9-81a7-411e-b55a-8486ba065b4b";
    component.inventoryItemEditForm.controls['name'].setValue('Fantastic Wooden Soap');
    component.inventoryItemEditForm.controls['name'].markAsDirty();
    component.inventoryItemEditForm.controls['quantity'].setValue('');
    component.inventoryItemEditForm.controls['quantity'].markAsDirty();

    component.editInventoryItemData();
    tick();

    expect(component.errorMessage).toEqual('You need to fill in all required fields!')
  }));

  it('should throw error on edit of inventory item', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.inventoryItem.id = "5b3c87c9-81a7-411e-b55a-8486ba065b4b";
    component.inventoryItemEditForm.controls['name'].setValue('Fantastic Wooden Soap');
    component.inventoryItemEditForm.controls['name'].markAsDirty();
    component.inventoryItemEditForm.controls['quantity'].setValue('500');
    component.inventoryItemEditForm.controls['quantity'].markAsDirty();

    const modalClose = spyOn(component.activeModal, 'close');

    component.editInventoryItemData();
    tick();

    expect(component.errorMessage).toEqual('Inventory Item not Found.');
    expect(modalClose).not.toHaveBeenCalledWith('edited');

    localStorage.removeItem('throwError');
  }));
});
