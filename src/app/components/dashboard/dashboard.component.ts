import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public unreadMessages = {
    sum: 0,
    appointments: 0,
    orders: 0,
    users: 0,
  };

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.unreadMessages = {
      sum: 7,
      appointments: 2,
      orders: 3,
      users: 1,
    };
  }
}
