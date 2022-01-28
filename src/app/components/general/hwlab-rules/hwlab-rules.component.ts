import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-hwlab-rules',
  // templateUrl: './hwlab-rules.component.html',
  template: '<div markdown [data]="content"></div>',
  // styleUrls: ['./hwlab-rules.component.scss']
})

/**
 * Component for the hardware lab rules page
 * @typedef {Component} HwlabRulesComponent
 * @class
 */
export class HwlabRulesComponent implements OnInit {
  public content = "";

  constructor(public adminService: AdminService) {

  }

  ngOnInit(): void {
    this.adminService.getGlobalSettings().subscribe(
      (data) => {
        this.content = data.find(x => x.key === "static.lab_rules")?.value ?? ""
      });
  }
}
