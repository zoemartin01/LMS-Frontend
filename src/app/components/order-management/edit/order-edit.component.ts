import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { AuthService } from "../../../services/auth.service";
import { InventoryService } from "../../../services/inventory.service";
import { OrderService } from "../../../services/order.service";
import { UtilityService } from "../../../services/utility.service";

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
    itemName: new FormControl('', Validators.required),
    quantity: new FormControl(null,[
      Validators.required,
      Validators.min(1),
    ]),
    url: new FormControl('', Validators.required),
    status: new FormControl(0, Validators.required),
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
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(
    public orderService: OrderService,
    public inventoryService: InventoryService,
    public authService: AuthService,
    public utilityService: UtilityService,
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
    this.getAllInventoryItems();
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
        this.order = res;

        if (res.item !== null) {
          this.orderEditForm.controls['itemName'].setValue(res.item.name);
        } else {
          this.orderEditForm.controls['itemName'].setValue(res.itemName);
        }

        this.orderEditForm.controls['quantity'].setValue(res.quantity);
        this.orderEditForm.controls['url'].setValue(res.url);
        this.orderEditForm.controls['status'].setValue(res.status);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Changes data of order
   */
  public async editOrder(): Promise<void> {
    this.orderService.updateOrderData(this.order.id, this.utilityService.getDirtyValues(this.orderEditForm)
    ).subscribe({
      next: () => {
        this.activeModal.close('edited');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
