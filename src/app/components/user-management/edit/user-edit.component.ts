import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { UserId } from "../../../types/aliases/user-id";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(public userService : UserService) { }

  ngOnInit(): void {
  }
  /**
   * Gets user data (including: mail adress, name, role, e-mail verification status)
   */
  public async getUserData(): Promise<void> {
  }

  /**
   * Accepts pending user
   * @param userId
   */
  public async acceptPendingUser(userId: UserId): Promise<void> {
  }

  /**
   * Denies pending user
   * @param userId
   */
  public async denyPendingUser(userId: UserId): Promise<void> {
  }

  /**
   * Deletes user
   * @param userId
   */
  public async deleteUser(userId: UserId): Promise<void> {
  }

  /**
   * Changes name of user
   * @param userId
   */
  public async changeName(userId: UserId): Promise<void>{

  }
  /**
   * Changes e-mail of user
   * @param userId
   */
  public async changeMail(userId: UserId): Promise<void>{

  }
  /**
   * Changes password of user
   * @param userId
   */
  public async changePassword(userId: UserId): Promise<void>{

  }
  /**
   * Changes role of user
   * @param userId
   */
  public async changeRole(userId: UserId): Promise<void>{

  }
  /**
   * Changes e-mail verification Status of user
   * @param userId
   */
  public async changeMailStatus(userId: UserId): Promise<void>{

  }


}
