import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-homepage',
  template: '<div markdown [data]="content"></div>',
})

/**
 * Component for the homepage
 * @typedef {Component} HomepageComponent
 * @class
 */
export class HomepageComponent implements OnInit {
  public content = "";

  constructor(public adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getGlobalSettings().subscribe(
      (data) => {
        this.content = data.find(x => x.key === "static.homepage")?.value ?? "";
      });
  }
}
