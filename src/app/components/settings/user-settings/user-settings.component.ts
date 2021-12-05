import { Component, OnInit } from '@angular/core';

import { UserService } from "../../../services/user.service";

import {User} from "../../../types/user";
import {UserRole} from "../../../types/enums/user-role";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  public user: User = {
    id: null,
    firstname: '',
    lastname: '',
    email: '',
    userRole: UserRole.unkown,
  };
  constructor(public userService : UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user.id = +params['id'];
      this.getUserData();
    });
  }

  /**
   * Gets user data (including: mail adress, name, role, e-mail verification status)
   */
  public async getUserData(): Promise<void> {
    //use this.user.id here and set this.user
  }

  /**
   * Changes password
   */
  public async changePassword(): Promise<void>{

  }

  /**
   * Deletes users account
   */
  public async deleteAccount(): Promise<void>{

  }

}
