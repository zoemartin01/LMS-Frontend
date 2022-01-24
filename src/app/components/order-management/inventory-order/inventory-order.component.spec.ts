import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { InventoryOrderComponent } from './inventory-order.component';

describe('InventoryOrderComponent', () => {
  let component: InventoryOrderComponent;
  let fixture: ComponentFixture<InventoryOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InventoryOrderComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryOrderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
