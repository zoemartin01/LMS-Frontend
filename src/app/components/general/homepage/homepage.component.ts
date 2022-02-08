import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-homepage',
  template: '<div markdown [data]="content" class="markdown"></div>',
})

/**
 * Component for the homepage
 * @typedef {Component} HomepageComponent
 * @class
 */
export class HomepageComponent implements OnInit {
  public content = "";

  /**
   * constructor
   * @param {AdminService} adminService service that provides admin functionalities
   */
  constructor(public adminService: AdminService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.adminService.getGlobalSettings().subscribe(
      (data) => {
        this.content = data.find(x => x.key === "static.homepage")?.value ?? "";
      });
  }
}
