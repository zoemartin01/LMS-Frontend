import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { AdminService } from "../../../services/admin.service";
import { UtilityService } from "../../../services/utility.service";

import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

@Component({
  selector: 'app-decline',
  templateUrl: './user-decline.component.html',
  styleUrls: ['./user-decline.component.scss']
})

/**
 * Component for declining of a pending user
 */
export class UserDeclineComponent implements OnInit {
  public userDeclineForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
  });

  public user: User = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    role: UserRole.unknown,
    notificationChannel: NotificationChannel.unknown,
    emailVerification: true,
    isActiveDirectory: false,
  }
  public errorMessage: string ='';

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(
    public adminService: AdminService,
    public utilityService: UtilityService,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal
  ) {
    this.userDeclineForm.disable();
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getUserData();
  }

  /**
   * Gets user data
   */
  public async getUserData(): Promise<void> {
    this.adminService.getUser(this.user.id).subscribe({
      next: res => {
        this.user = res;

        this.userDeclineForm.controls['firstname'].setValue(res.firstName);
        this.userDeclineForm.controls['name'].setValue(res.lastName);
        this.userDeclineForm.controls['email'].setValue(res.email);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Declines user
   */
  public async declineUser(): Promise<void> {
    this.errorMessage = '';
    this.adminService.declineUserRequest(this.user.id).subscribe({
      next: () => {
        this.activeModal.close('declined');
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      },
    });
  }
}
