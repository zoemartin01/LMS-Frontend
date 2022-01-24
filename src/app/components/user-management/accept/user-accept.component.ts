import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../types/user";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {AdminService} from "../../../services/admin.service";
import {ActivatedRoute} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-accept',
  templateUrl: './user-accept.component.html',
  styleUrls: ['./user-accept.component.scss']
})
export class UserAcceptComponent implements OnInit {

  public userAcceptForm: FormGroup = new FormGroup({
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
    this.userAcceptForm.disable();
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

        this.userAcceptForm.controls['firstname'].setValue(res.firstName);
        this.userAcceptForm.controls['name'].setValue(res.lastName);
        this.userAcceptForm.controls['email'].setValue(res.email);
        this.userAcceptForm.controls['role'].setValue(res.role);
        this.userAcceptForm.controls['notificationChannel'].setValue(res.notificationChannel);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Accepts user
   */
  public async acceptUser(): Promise<void> {
    this.adminService.acceptUserRequest(this.user.id).subscribe({
      next: () => {
        this.adminService.getUsers();
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });    this.activeModal.close('deleted');
  }
}
