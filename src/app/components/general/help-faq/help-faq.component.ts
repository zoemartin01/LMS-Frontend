import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-faq',
  template: '<div markdown [data]="content" class="markdown"></div>',
})

/**
 * Component for the faq
 * @typedef {Component} HelpFaqComponent
 * @class
 */
export class HelpFaqComponent implements OnInit {
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
        this.content = data.find(x => x.key === "static.faq")?.value ?? "";
      });
  }
}
