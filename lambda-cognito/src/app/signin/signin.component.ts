import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent {
  emailVerificationMessage;
  constructor(private auth: AuthService) {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.auth.signIn(email, password);
  }
}
