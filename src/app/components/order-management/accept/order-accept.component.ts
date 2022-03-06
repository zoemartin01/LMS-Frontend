import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { OrderService } from "../../../services/order.service";
import { UtilityService } from "../../../services/utility.service";

import { Order } from "../../../types/order";
import { OrderStatus } from "../../../types/enums/order-status";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

@Component({
  selector: 'app-order-accept',
  templateUrl: './order-accept.component.html',
  styleUrls: ['./order-accept.component.scss']
})

/**
 * Component to accept an order
 */
export class OrderAcceptComponent implements OnInit {
  public orderAcceptForm: FormGroup = new FormGroup({
    itemName: new FormControl(''),
    quantity: new FormControl(0),
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
  public errorMessage = '';

  /**
   * Constructor
   * @constructor
   * @param {OrderService} orderService service providing order functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public orderService: OrderService, public utilityService: UtilityService, public activeModal: NgbActiveModal) {
    this.orderAcceptForm.disable();
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
  public async getOrderData(): Promise<void> {
    this.orderService.getOrderData(this.order.id).subscribe({
      next: res => {
        this.order = res;

        if (res.item !== null) {
          this.orderAcceptForm.controls['itemName'].setValue(res.item.name);
        } else {
          this.orderAcceptForm.controls['itemName'].setValue(res.itemName);
        }
        this.orderAcceptForm.controls['quantity'].setValue(res.quantity);
        this.orderAcceptForm.controls['url'].setValue(res.url);
        this.orderAcceptForm.controls['status'].setValue(res.status);
      },
      error: error => {
        console.error('There was an error!', error);
      },
    })
  }

  /**
   * Accept order
   */
  public async acceptOrder(): Promise<void> {
    this.errorMessage = '';
    this.orderService.acceptOrderRequest(this.order.id).subscribe({
      next: () => {
        this.activeModal.close('accepted');
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      },
    });
  }
}
