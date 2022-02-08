import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from "../../../services/auth.service";

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
   * @param {AuthService} authService service that provides authentication functionalities
   */
  constructor(public adminService: AdminService, public authService : AuthService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.adminService.getGlobalSettings().subscribe(
      (data) => {
        if(this.authService.isAdmin()) {
          this.content = data.find(x => x.key === "static.faq_admin")?.value ?? "";
        } else{
          this.content = data.find(x => x.key === "static.faq")?.value ?? "";
        }
      });
  }
}
