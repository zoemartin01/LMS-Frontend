import { Component, OnInit } from '@angular/core';
import {UserId} from "../../../types/aliases/user-id";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }
  /**
   * Gets user data (including: mail adress, name, role, e-mail verification status)
   */
  public async getUserData(): Promise<void> {
  }

  /**
   * Deletes user
   */
  public async deleteUser(userId: UserId): Promise<void> {
  }
}
