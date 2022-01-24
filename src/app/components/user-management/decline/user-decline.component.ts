import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../types/user";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {AdminService} from "../../../services/admin.service";
import {ActivatedRoute} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-decline',
  templateUrl: './user-decline.component.html',
  styleUrls: ['./user-decline.component.scss']
})
export class UserDeclineComponent implements OnInit {
  public userDeclineForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl('', [
      Validators.email,
    ]),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    role: new FormControl(''),
    notificationChannel: new FormControl(''),
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

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public adminService: AdminService, private route: ActivatedRoute, public activeModal: NgbActiveModal) {
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
        this.userDeclineForm.controls['role'].setValue(res.role);
        this.userDeclineForm.controls['notificationChannel'].setValue(res.notificationChannel);
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
    this.adminService.declineUserRequest(this.user.id).subscribe({
      next: () => {
        this.adminService.getUsers();
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
    this.activeModal.close('deleted');
  }
}
