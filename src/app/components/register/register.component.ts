import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Register user with provided data
   *
   * @param registerForm submitted register form
   */
  public async register(registerForm: NgForm): Promise<void> {
    if (registerForm.valid) {
    }
  }

}
