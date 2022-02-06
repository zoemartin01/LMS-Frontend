import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {InventoryService} from "../../../services/inventory.service";
import {OrderService} from "../../../services/order.service";

import {InventoryItem} from "../../../types/inventory-item";
import {Order} from "../../../types/order";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {OrderStatus} from "../../../types/enums/order-status";
import {UserRole} from "../../../types/enums/user-role";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ParseArgumentException} from "@angular/cli/models/parser";

@Component({
  selector: 'app-inventory-order',
  templateUrl: './inventory-order.component.html',
  styleUrls: ['./inventory-order.component.scss']
})

/**
 * Component to inventory an order
 *
 *
 */
export class InventoryOrderComponent implements OnInit {
  public inventoryOrderForm: FormGroup = new FormGroup({
    itemName: new FormControl(''),
    quantity: new FormControl(null),
    url: new FormControl(''),
    status: new FormControl(0),
  });

  public order: Order = {
    id: null,
    itemName: null,
    item: null,
    quantity: null,
    url: '',
    user: {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      role: UserRole.unknown,
      notificationChannel: NotificationChannel.unknown,
      emailVerification: true,
      isActiveDirectory: false,
    },
    status: OrderStatus.unknown,
  }
  public inventoryItem: InventoryItem = {
    id: null,
    name: '',
    description: '',
    quantity: null,
  }
  existingItems: InventoryItem[] = [];

  /**
   * Constructor
   * @constructor
   * @param {InventoryService} inventoryService service providing inventory functionalities
   * @param {OrderService} orderService service providing order functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(
    public inventoryService: InventoryService,
    public orderService: OrderService,
    public activeModal: NgbActiveModal
  ) {
    this.inventoryOrderForm.controls['quantity'].disable();
    this.inventoryOrderForm.controls['url'].disable();
    this.inventoryOrderForm.controls['status'].disable();
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
      this.getOrderData();
      this.getAllInventoryItems();
  }

  /**
   * Gets all data of order
   */
  public async getOrderData(): Promise<void> {
    this.orderService.getOrderData(this.order.id).subscribe({
      next: res => {
        this.order = res;
        if (res.item !== null) {
          this.inventoryOrderForm.controls['itemName'].setValue(res.item.name);
        } else {
          this.inventoryOrderForm.controls['itemName'].setValue(res.itemName);
        }
        this.inventoryOrderForm.controls['quantity'].setValue(res.quantity);
        this.inventoryOrderForm.controls['url'].setValue(res.url);
        this.inventoryOrderForm.controls['status'].setValue(res.status);
      },
      error: error => {
        console.error('There was an error!', error);
      },
    });
  }

  /**
   * Gets all inventory items
   */
  public async getAllInventoryItems(): Promise<void> {
    this.inventoryService.getInventoryItems().subscribe({
      next: res => {
        this.existingItems = res.data;
      },
      error: error => {
        console.error('There was an error!', error)
      }
    });
  }

  /**
   * Sets order status to "inventoried" and adds order to inventory
   *
   */
  public async inventoryOrder(): Promise<void> {
    this.inventoryService.getInventoryItemByName(this.inventoryOrderForm.controls['itemName'].value).subscribe({
      next: res => {
        this.inventoryItem = res;
      },
      error: error => {
        console.error('There was an error!', error);
      },
    });
    if (this.inventoryItem === null) {
      const newInventoryItem: InventoryItem = {
        id: null,
        name: this.inventoryOrderForm.value.itemName,
        description: '',
        quantity: this.inventoryOrderForm.value.quantity,
      };
      this.inventoryService.createInventoryItem(newInventoryItem).subscribe({
        error: error => {
          console.error('There was an error!', error);
        },
      });
    } else if (this.inventoryItem.quantity !== null && this.order.quantity !== null){
      this.inventoryService.editInventoryItem(
        this.inventoryItem.id, {quantity: this.inventoryItem.quantity + this.order.quantity}
      ).subscribe({
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }
    this.orderService.updateOrderData(this.order.id, {
      itemName: this.inventoryOrderForm.value.itemName,
      status: OrderStatus.inventoried,
    }).subscribe({
      next: () => {
        this.activeModal.close(`inventoried ${this.order.id}`)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
}
