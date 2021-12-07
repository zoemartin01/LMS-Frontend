import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { AuthService } from "../../../services/auth.service";

import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";

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

  constructor(public authService: AuthService, private route: ActivatedRoute) {
  }

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
  public openUserEditForm(): void {
  }

  /**
   * Opens user delete confirmation dialog
   */
  public openUserDeletionDialog(): void {
  }
}
