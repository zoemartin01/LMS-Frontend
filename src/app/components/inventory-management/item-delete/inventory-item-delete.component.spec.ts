import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { InventoryItemDeleteComponent } from './inventory-item-delete.component';

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

  deleteInventoryItem(id: InventoryItemId): Observable<InventoryItem> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Inventory Item not Found.',
          }
        });
      }

      observer.next();
    });
  }
}

describe('InventoryItemDeleteComponent', () => {
  let component: InventoryItemDeleteComponent;
  let fixture: ComponentFixture<InventoryItemDeleteComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InventoryItemDeleteComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: InventoryService, useClass: MockInventoryService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryItemDeleteComponent);
    component = fixture.componentInstance;

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page', fakeAsync(() => {
    expect(component.inventoryItem).toEqual({
      id: null,
      name: '',
      description: '',
      quantity: null,
    });

    component.inventoryItem.id = "5b3c87c9-81a7-411e-b55a-8486ba065b4b";

    component.ngOnInit();
    tick();

    expect(component.inventoryItem).toEqual({
      id: "5b3c87c9-81a7-411e-b55a-8486ba065b4b",
      name: "Fantastic Steel Soap",
      description: "Distinctio iste et est tenetur officiis quis.",
      quantity: 40424,
    });

    expect(component.inventoryItemDeleteForm.controls['name'].value).toBe('Fantastic Steel Soap');
    expect(component.inventoryItemDeleteForm.controls['description'].value).toBe('Distinctio iste et est tenetur officiis quis.');
    expect(component.inventoryItemDeleteForm.controls['quantity'].value).toBe(40424);
  }));

  it('should throw error on page init', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    expect(component.inventoryItem).toEqual({
      id: null,
      name: '',
      description: '',
      quantity: null,
    });
    component.inventoryItem.id = "5b3c87c9-81a7-411e-b55a-8486ba065b4b";

    component.ngOnInit();
    tick();

    expect(consoleError).toHaveBeenCalled();
    expect(component.inventoryItem).toEqual({
      id: "5b3c87c9-81a7-411e-b55a-8486ba065b4b",
      name: '',
      description: '',
      quantity: null,
    });

    expect(component.inventoryItemDeleteForm.controls['name'].value).toBe('');
    expect(component.inventoryItemDeleteForm.controls['description'].value).toBe('');
    expect(component.inventoryItemDeleteForm.controls['quantity'].value).toBeNull();

    localStorage.removeItem('throwError');
  }));

  it('should delete inventory item', fakeAsync(() => {
    component.inventoryItem.id = "5b3c87c9-81a7-411e-b55a-8486ba065b4b";

    const modalClose = spyOn(component.activeModal, 'close');

    component.deleteInventoryItem();
    tick();

    expect(modalClose).toHaveBeenCalledWith('deleted');
  }));

  it('should throw error on deletion of inventory item', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.inventoryItem.id = "5b3c87c9-81a7-411e-b55a-8486ba065b4b";

    component.deleteInventoryItem();
    tick();

    expect(component.errorMessage).toEqual('Inventory Item not Found.');

    localStorage.removeItem('throwError');
  }));
});
