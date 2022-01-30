import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-safety-instructions',
  template: '<div markdown [data]="content"></div>',
})

/**
 * Component for the safety instructions page
 * @typedef {Component} SafetyInstructionsComponent
 * @class
 */
export class SafetyInstructionsComponent implements OnInit {
  public content = "";

  constructor(public adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getGlobalSettings().subscribe(
      (data) => {
        this.content = data.find(x => x.key === "static.safety_instructions")?.value ?? "";
      });
  }
}
