import { Component } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-sidebar-warning',
  templateUrl: './sidebar-warning.component.html',
  styleUrls: ['./sidebar-warning.component.scss']
})

/**
 * Component to show a warning when a user tries to open a second sidebar on calendar view pages
 */
export class SidebarWarningComponent {
  /**
   * Constructor
   * @constructor
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public activeModal: NgbActiveModal) {
  }
}
