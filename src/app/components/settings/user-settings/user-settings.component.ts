import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../../services/auth.service";

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

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUserData();
    //@todo get
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
   * Opens user delete confirmation dialog
   */
  public openUserDeletionDialog(): void {
  }

  //@todo get and set notification channel
}
