import { Component } from '@angular/core';

import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-help-faq',
  templateUrl: './help-faq.component.html',
  styleUrls: ['./help-faq.component.scss']
})
export class HelpFaqComponent {

  constructor(public authService: AuthService) {
  }

}
