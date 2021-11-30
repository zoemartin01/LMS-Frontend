import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  unreadMessages: number = 0;
  loggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.unreadMessages = 7;
    this.loggedIn = true;
    this.isAdmin = true;
  }
}
