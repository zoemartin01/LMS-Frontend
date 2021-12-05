import { Component, OnInit } from '@angular/core';

import { UserService } from "../../../services/user.service";

import {User} from "../../../types/user";
import {UserRole} from "../../../types/enums/user-role";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
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
   * Accepts pending user
   */
  public async acceptPendingUser(): Promise<void> {
    //use this.user.id here
  }

  /**
   * Denies pending user
   */
  public async denyPendingUser(): Promise<void> {
    //use this.user.id here
  }

  /**
   * Deletes user
   */
  public async deleteUser(): Promise<void> {
    //use this.user.id here
  }

  /**
   * Changes name of user
   */
  public async changeName(): Promise<void>{
    //use this.user.id here
  }

  /**
   * Changes e-mail of user
   */
  public async changeMail(): Promise<void>{
    //use this.user.id here
  }

  /**
   * Changes password of user
   */
  public async changePassword(): Promise<void>{
    //use this.user.id here
  }

  /**
   * Changes role of user
   */
  public async changeRole(): Promise<void>{
    //use this.user.id here
  }

  /**
   * Changes e-mail verification Status of user
   */
  public async changeMailStatus(): Promise<void>{
    //use this.user.id here
  }
}
