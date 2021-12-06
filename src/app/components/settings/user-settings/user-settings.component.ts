import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";

import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";

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

  constructor(public userService: UserService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUserData();
    //@todo get
  }

  /**
   * Gets user data
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
   * Opens account delete confirmation popup
   */
  public async deleteAccount(): Promise<void>{
  }

  //@todo get and set notification channel
}
