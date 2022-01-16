import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { InventoryItemCreateComponent } from './inventory-item-create.component';

describe('InventoryItemCreateComponent', () => {
  let component: InventoryItemCreateComponent;
  let fixture: ComponentFixture<InventoryItemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InventoryItemCreateComponent,
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
    fixture = TestBed.createComponent(InventoryItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
