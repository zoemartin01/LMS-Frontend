import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

import { InventoryItemViewComponent } from './inventory-item-view.component';

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
        RouterTestingModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
