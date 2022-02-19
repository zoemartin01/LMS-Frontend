import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup } from "@angular/forms";

import { OrderService } from "../../../services/order.service";

import { Order } from "../../../types/order";
import { OrderStatus } from "../../../types/enums/order-status";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

@Component({
  selector: 'app-order-decline',
  templateUrl: './order-decline.component.html',
  styleUrls: ['./order-decline.component.scss']
})

/**
 * Component to decline an order
 */
export class OrderDeclineComponent implements OnInit {
  public orderDeclineForm: FormGroup = new FormGroup({
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
  };

  /**
   * Constructor
   * @constructor
   * @param {OrderService} orderService service providing order functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public orderService: OrderService, public activeModal: NgbActiveModal) {
    this.orderDeclineForm.disable();
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

        if (res.item !== null) {
          this.orderDeclineForm.controls['itemName'].setValue(res.item.name);
        } else {
          this.orderDeclineForm.controls['itemName'].setValue(res.itemName);
        }
        this.orderDeclineForm.controls['quantity'].setValue(res.quantity);
        this.orderDeclineForm.controls['url'].setValue(res.url);
        this.orderDeclineForm.controls['status'].setValue(res.status);
      },
      error: error => {
        console.error('There was an error!', error);
      },
    })
  }

  /**
   * Declines order
   */
  public async declineOrder() : Promise<void> {
    this.orderService.declineOrderRequest(this.order.id).subscribe({
      next: () => {
        this.activeModal.close('declined');
      },
      error: error => {
        console.error('There was an error!', error);
      },
    });
  }
}
