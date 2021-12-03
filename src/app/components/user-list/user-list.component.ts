import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  /**
   * gets user data (including: mail adress, name, role, e-mail verification status)
    */
  public async getUsers(){

  }

  /**
   * accepts pending user
   */
  public async acceptPendingUser(){

  }

  /**
   * denies pending user
   */
  public async denyPendingUser(){

  }

  /**
   * deletes user
   */
  public async deleteUser(){

  }
}
