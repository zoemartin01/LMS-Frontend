import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { InventoryItemCreateComponent } from './inventory-item-create.component';

import { InventoryService } from "../../../services/inventory.service";

import { InventoryItem } from "../../../types/inventory-item";

class MockInventoryService {
  createInventoryItem(inventoryItem: InventoryItem): Observable<InventoryItem> {
    return new Observable((observer) => {
      if (inventoryItem.quantity === 0) {
        observer.error({
          error: {
            error: {
              message: 'Whatever.',
            }
          }
        });
      }

      observer.next(inventoryItem);
    });
  }
}

describe('InventoryItemCreateComponent', () => {
  let component: InventoryItemCreateComponent;
  let fixture: ComponentFixture<InventoryItemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InventoryItemCreateComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
      providers: [
        NgbActiveModal,
        {provide: InventoryService, useClass: MockInventoryService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryItemCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
