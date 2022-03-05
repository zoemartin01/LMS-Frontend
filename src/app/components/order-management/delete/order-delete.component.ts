import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import {OrderService} from "../../../services/order.service";

import {Order} from "../../../types/order";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {OrderStatus} from "../../../types/enums/order-status";
import {UserRole} from "../../../types/enums/user-role";
import {UtilityService} from "../../../services/utility.service";

@Component({
  selector: 'app-order-delete',
  templateUrl: './order-delete.component.html',
  styleUrls: ['./order-delete.component.scss']
})

/**
 * Component for the deletion of an order
 */
export class OrderDeleteComponent implements OnInit {
  public orderDeleteForm: FormGroup = new FormGroup({
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
    this.orderDeleteForm.disable();
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
          this.orderDeleteForm.controls['itemName'].setValue(res.item.name);
        } else {
          this.orderDeleteForm.controls['itemName'].setValue(res.itemName);
        }

        this.orderDeleteForm.controls['quantity'].setValue(res.quantity);
        this.orderDeleteForm.controls['url'].setValue(res.url);
        this.orderDeleteForm.controls['status'].setValue(res.status);
      },
      error: error => {
        console.error('There was an error!', error);
      },
    })
  }

  /**
   * Deletes order
   */
  public async deleteOrder(): Promise<void> {
    this.errorMessage = '';
    this.orderService.deleteOrder(this.order.id).subscribe({
      next: () => {
        this.activeModal.close('deleted');
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    });
  }
}
