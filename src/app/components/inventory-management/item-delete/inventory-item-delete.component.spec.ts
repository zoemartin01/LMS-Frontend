import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

import { InventoryItemDeleteComponent } from './inventory-item-delete.component';

describe('InventoryItemDeleteComponent', () => {
  let component: InventoryItemDeleteComponent;
  let fixture: ComponentFixture<InventoryItemDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InventoryItemDeleteComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
