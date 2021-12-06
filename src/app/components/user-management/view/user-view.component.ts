import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {UserService} from "../../../services/user.service";

import {User} from "../../../types/user";
import {UserRole} from "../../../types/enums/user-role";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  public user: User = {
    id: null,
    firstname: '',
    lastname: '',
    email: '',
    userRole: UserRole.unkown,
  };

  constructor(public userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user.id = +params['id'];
      this.getUserData();
    });
  }

  /**
   * Gets user data
   */
  public async getUserData(): Promise<void> {
    //use this.user.id here and set this.user
  }

  /**
   * Opens user edit form
   */
  public editUser(): void {
  }

  /**
   * Opens user delete confirmation popup
   */
  public deleteUser(): void {
  }
}
