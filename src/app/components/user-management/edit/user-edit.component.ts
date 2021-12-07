import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";


import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import { NgForm } from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

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

  constructor(public authService : AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user.id = +params['id'];
      this.getUserData();
    });
  }
  /**
   * Get data of user
   */
  public async getUserData(): Promise<void> {
    //use this.user.id here and set this.user
  }

  /**
   * Changes data of user
   *
   * @param userEditForm form to edit user
   */
  public async editUserData(userEditForm: NgForm): Promise<void> {
  }
}
