import { Component } from '@angular/core';

import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-help-faq',
  templateUrl: './help-faq.component.html',
  styleUrls: ['./help-faq.component.scss']
})

/**
 * Component for the help & faq page
 * @typedef {Component} HelpFaqComponent
 * @class
 */
export class HelpFaqComponent {

  /**
   * Constructor
   * @param {AuthService} authService service providing appointment functionalities
   */
  constructor(public authService: AuthService) {
  }

}
