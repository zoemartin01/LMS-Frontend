import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-hwlab-rules',
  template: '<div markdown [data]="content"></div>',
})

/**
 * Component for the hardware lab rules page
 * @typedef {Component} HwlabRulesComponent
 * @class
 */
export class HwlabRulesComponent implements OnInit {
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
        this.content = data.find(x => x.key === "static.lab_rules")?.value ?? "";
      });
  }
}
