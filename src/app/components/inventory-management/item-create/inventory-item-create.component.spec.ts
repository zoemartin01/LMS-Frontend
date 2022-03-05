import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { Observable } from "rxjs";

import { InventoryItemCreateComponent } from './inventory-item-create.component';

import { InventoryService } from "../../../services/inventory.service";

import { InventoryItem } from "../../../types/inventory-item";

class MockInventoryService {
  createInventoryItem(name: string, description: string, quantity: number): Observable<InventoryItem> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Internal Server Error.',
          }
        });
      }

      observer.next({
        id: "5b3c87c9-81a7-411e-b55a-8486ba065b4b",
        name: name,
        description: description,
        quantity: quantity,
      });
    });
  }
}

describe('InventoryItemCreateComponent', () => {
  let component: InventoryItemCreateComponent;
  let fixture: ComponentFixture<InventoryItemCreateComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InventoryItemCreateComponent,
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

    fixture = TestBed.createComponent(InventoryItemCreateComponent);
    component = fixture.componentInstance;

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create inventory item', fakeAsync(() => {
    component.createInventoryItemForm.controls['itemName'].setValue('Fantastic Steel Soap');
    component.createInventoryItemForm.controls['description'].setValue('Distinctio iste et est tenetur officiis quis.');
    component.createInventoryItemForm.controls['quantity'].setValue('40424');

    const modalClose = spyOn(component.activeModal, 'close');

    component.createInventoryItem();
    tick();

    expect(modalClose).toHaveBeenCalledWith('created 5b3c87c9-81a7-411e-b55a-8486ba065b4b');
  }));

  it('should throw error on creation of inventory item', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.createInventoryItemForm.controls['itemName'].setValue('Fantastic Steel Soap');
    component.createInventoryItemForm.controls['description'].setValue('Distinctio iste et est tenetur officiis quis.');
    component.createInventoryItemForm.controls['quantity'].setValue('40424');

    component.createInventoryItem();
    tick();

    expect(component.errorMessage).toEqual('Internal Server Error.');

    localStorage.removeItem('throwError');
  }));

  it('should show error when form is invalid', fakeAsync(() => {
    component.createInventoryItemForm.controls['quantity'].setValue('');

    component.createInventoryItem();
    tick();

    expect(component.errorMessage).toEqual('You need to fill in all required fields!');
  }));
});
