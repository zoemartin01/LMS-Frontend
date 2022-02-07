import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {OrderDeleteComponent} from "../delete/order-delete.component";
import {OrderEditComponent} from "../edit/order-edit.component";

import {OrderService} from "../../../services/order.service";

import {Order} from "../../../types/order";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {OrderStatus} from "../../../types/enums/order-status";
import {UserRole} from "../../../types/enums/user-role";
import {InventoryOrderComponent} from "../inventory-order/inventory-order.component";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})

/**
 * Component for the order view popup
 */
export class OrderViewComponent implements OnInit {
  public orderViewForm: FormGroup = new FormGroup({
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
  public dirty: boolean = false;
  public canInteract: boolean = false;

  /**
   * Constructor
   * @constructor
   * @param {OrderService} orderService service providing order functionalities
   * @param {AuthService} authService service providing authentication functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(public orderService: OrderService, public authService: AuthService, public activeModal: NgbActiveModal, private modalService: NgbModal) {
    this.orderViewForm.disable();
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getOrderData();
  }

  /**
   * Gets all data of order
   */
  public async getOrderData() : Promise<void> {
    this.orderService.getOrderData(this.order.id).subscribe({
      next: res => {
        this.order = res;
        this.canInteract = !(this.order.status === OrderStatus.inventoried) &&
          ((this.order.status === OrderStatus.pending) || this.authService.isAdmin());

        if (res.item !== null) {
          this.orderViewForm.controls['itemName'].setValue(res.item.name);
        } else {
          this.orderViewForm.controls['itemName'].setValue(res.itemName);
        }

        this.orderViewForm.controls['quantity'].setValue(res.quantity);
        this.orderViewForm.controls['url'].setValue(res.url);
        this.orderViewForm.controls['status'].setValue(res.status);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Opens order edit form
   */
  public openOrderEditForm(): void {
    const modal = this.modalService.open(OrderEditComponent);
    modal.componentInstance.order.id = this.order.id;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getOrderData();
        this.dirty= true;
      }
    });
  }

  /**
   * Opens order deletion confirmation dialog
   */
  public openOrderDeletionDialog(): void {
    const modal = this.modalService.open(OrderDeleteComponent);
    modal.componentInstance.order.id = this.order.id;
    modal.result.then((result) => {
      if (result === 'deleted') {
        this.activeModal.close('dirty');
        return;
      }

      if (result !== 'aborted') {
        this.getOrderData();
        this.dirty = true;
      }
    });
  }

  public openInventoryOrderForm(): void {
    const modal = this.modalService.open(InventoryOrderComponent);
    modal.componentInstance.order.id = this.order.id;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getOrderData();
        this.dirty = true;
      }
    });
  }
}
