import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { WhitelistRetailerUserListComponent } from "../whitelist-retailer-user-list/whitelist-retailer-user-list.component";

import { AdminService } from "../../../services/admin.service";
import { InventoryService } from "../../../services/inventory.service";
import { OrderService } from "../../../services/order.service";

import { InventoryItem } from "../../../types/inventory-item";
import { Order } from "../../../types/order";

@Component({
  selector: 'app-order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.scss']
})

/**
 * Component for order request popup
 */
export class OrderRequestComponent implements OnInit {
  public existingItems: InventoryItem[] = [];
  public requestOrderForm: FormGroup = new FormGroup({
    itemName: new FormControl('', [
      Validators.required,
    ]),
    quantity: new FormControl(0,[
      Validators.required,
      Validators.min(1),
    ]),
    url: new FormControl('', [
      Validators.required,
    ]),
  });
  public isWhitelisted: boolean = true;
  requestOrderError: boolean = false;
  requestOrderErrorMessage: string = '';

  /**
   * Constructor
   * @constructor
   * @param {OrderService} orderService service providing order functionalities
   * @param {AdminService} adminService service providing admin functionalities
   * @param {InventoryService} inventoryService service providing inventory functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(
    public orderService: OrderService,
    public adminService: AdminService,
    public inventoryService: InventoryService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal
  ) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
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
   * Checks url of item to order against urls of whitelisted retailers
   */
  public async checkUrlAgainstWhitelistedRetailers(): Promise<void> {
    this.adminService.checkDomainAgainstWhitelist(this.requestOrderForm.controls['url'].value).subscribe({
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
   * Creates order request with data
   */
  public async requestOrder(): Promise<void> {
    if (this.requestOrderForm.valid) {
      this.orderService.requestOrder(
        this.requestOrderForm.controls['itemName'].value,
        this.requestOrderForm.controls['quantity'].value,
        this.requestOrderForm.controls['url'].value
      ).subscribe({
        next: (orderRequest: Order) => {
          if (orderRequest.id !== null) {
            this.activeModal.close(`created ${orderRequest.id}`);
          }
        },
        error: error => {
          this.requestOrderError = true;
          this.requestOrderErrorMessage = error.error.message;
          console.error('There was an error!', error);
        }
      });
    } else {
      this.requestOrderError = true;
      this.requestOrderErrorMessage = 'Invalid form values';
      console.error('Invalid form values');
    }
  }
}
