import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { AdminService } from "../../../services/admin.service";

import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

@Component({
  selector: 'app-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})

/**
 * Component for the deletion of a user
 *
 *
 */
export class UserDeleteComponent implements OnInit {
  public user: User = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    userRole: UserRole.unknown,
    notificationChannel: NotificationChannel.unknown,
  }

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {ActivatedRoute} route route that activated this component
   */
  constructor(public adminService: AdminService, private route: ActivatedRoute) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user.id = params['id'];
    });
  }

  /**
   * Deletes user
   */
  public async deleteUser(): Promise<void> {
  }
}
