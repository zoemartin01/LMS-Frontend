import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { InventoryItemEditComponent } from './inventory-item-edit.component';

describe('InventoryItemEditComponent', () => {
  let component: InventoryItemEditComponent;
  let fixture: ComponentFixture<InventoryItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InventoryItemEditComponent,
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
    fixture = TestBed.createComponent(InventoryItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
