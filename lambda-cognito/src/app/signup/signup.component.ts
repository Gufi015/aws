import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  displayVerificationMessage: boolean = false;
  newUser: any;

  constructor(private auth: AuthService) { }

  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    this.auth.signUp(email, password);

  }

  onCodeSubmit(form: NgForm) {

    const code = form.value.code;
    this.auth.confirmCode(code);

  }
}
