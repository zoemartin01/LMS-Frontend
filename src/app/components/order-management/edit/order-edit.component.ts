import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { AuthService } from "../../../services/auth.service";
import { InventoryService } from "../../../services/inventory.service";
import { OrderService } from "../../../services/order.service";

import { InventoryItem } from "../../../types/inventory-item";
import { Order } from "../../../types/order";
import { OrderStatus } from "../../../types/enums/order-status";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

@Component({
  selector: 'app-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})

/**
 * Component for the order edit popup
 */
export class OrderEditComponent implements OnInit {
  public existingItems: InventoryItem[] = [];
  public orderEditForm: FormGroup = new FormGroup({
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

  /**
   * Constructor
   * @constructor
   * @param {OrderService} orderService service providing order functionalities
   * @param {InventoryService} inventoryService service providing inventory functionalities
   * @param {AuthService} authService service providing authentication functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(
    public orderService: OrderService,
    public inventoryService: InventoryService,
    public authService: AuthService,
    public activeModal: NgbActiveModal
  ) {
    if (!(this.authService.isAdmin())) {
      this.orderEditForm.controls['status'].disable();
    }
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getOrderData();
    if (!this.authService.isAdmin() && this.order.status !== OrderStatus.pending) {
      this.orderEditForm.disable();
    } else {
      this.getAllInventoryItems();
    }
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
   * Gets all data of order
   */
  public async getOrderData(): Promise<void> {
    this.orderService.getOrderData(this.order.id).subscribe({
      next: res => {
        this.updateOrderEditForm(res);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  private updateOrderEditForm(order: Order) {
    this.order = order;

    if (order.item !== null) {
      this.orderEditForm.controls['itemName'].setValue(order.item.name);
    } else {
      this.orderEditForm.controls['itemName'].setValue(order.itemName);
    }

    this.orderEditForm.controls['quantity'].setValue(order.quantity);
    this.orderEditForm.controls['url'].setValue(order.url);
    this.orderEditForm.controls['status'].setValue(order.status);
  }

  /**
   * Changes data of order
   *
   * @param {NgForm} orderEditForm submitted edit form
   */
  public async editOrder(): Promise<void> {
    this.orderService.updateOrderData(this.order.id, this.getDirtyValues(this.orderEditForm)).subscribe({
      next: () => {
        this.activeModal.close('edited');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Gets all values of a form that are marked with a dirty bit
   *
   * @param {FormGroup} form form
   */
  public getDirtyValues(form: FormGroup) {
    let dirtyValues: { [key: string]: any} = {};

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if ((<FormGroup>currentControl).controls)
            dirtyValues[key] = this.getDirtyValues(<FormGroup>currentControl);
          else
            dirtyValues[key] = currentControl.value;
        }
      });

    return dirtyValues;
  }
}
