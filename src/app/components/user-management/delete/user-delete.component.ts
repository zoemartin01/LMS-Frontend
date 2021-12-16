import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../types/user";
import {UserService} from "../../../services/user.service";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {UserRole} from "../../../types/enums/user-role";

@Component({
  selector: 'app-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
/**
 * Component for the deletion of a user
 * @typedef {Component} UserDeleteComponent
 * @class
 */
export class UserDeleteComponent implements OnInit {
  public user: User = {
    email: "",
    firstname: "",
    lastname: "",
    notificationChannel: NotificationChannel.unknown,
    userRole: UserRole.unkown,
    id: null
  }

  constructor(public userService: UserService, private route: ActivatedRoute) {
  }

  /**
   * Init page
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
