import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { WhitelistRetailerUserListComponent } from "../whitelist-retailer-user-list/whitelist-retailer-user-list.component";

import { AdminService } from "../../../services/admin.service";
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
    quantity: new FormControl(0,[
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
  public isWhitelisted: boolean = true;

  /**
   * Constructor
   * @constructor
   * @param {OrderService} orderService service providing order functionalities
   * @param {InventoryService} inventoryService service providing inventory functionalities
   * @param {AuthService} authService service providing authentication functionalities
   * @param {AdminService} adminService service providing admin functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(
    public orderService: OrderService,
    public inventoryService: InventoryService,
    public authService: AuthService,
    public adminService: AdminService,
    public utilityService: UtilityService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal
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
   * Checks url of item to order against urls of whitelisted retailers
   */
  public async checkUrlAgainstWhitelistedRetailers(): Promise<void> {
    this.adminService.checkDomainAgainstWhitelist(this.orderEditForm.controls['url'].value).subscribe({
      next: res => {
        this.isWhitelisted = res.isWhitelisted;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Opens whitelist retailer user list popup
   */
  public async openWhitelistRetailerList(): Promise<void> {
    this.modalService.open(WhitelistRetailerUserListComponent);
  }

  /**
   * Changes data of order
   */
  public async editOrder(): Promise<void> {
    const changedData = this.utilityService.getDirtyValues(this.orderEditForm);
    if (this.orderEditForm.controls['status'].dirty) {
      changedData['status'] = +changedData['status'];
    }
    this.orderService.updateOrderData(this.order.id, changedData).subscribe({
      next: () => {
        this.activeModal.close('edited');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
