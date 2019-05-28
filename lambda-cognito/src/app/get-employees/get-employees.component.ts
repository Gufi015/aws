import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Http, Headers} from "@angular/http";

@Component({
  selector: 'app-get-employees',
  templateUrl: './get-employees.component.html',
  styleUrls: ['./get-employees.component.css']
})
export class GetEmployeesComponent implements OnInit {

  constructor(private http: Http, private auth: AuthService) { }

  ngOnInit() {

    this.auth.getAuthenticatedUser().getSession( (err, session) => {
      if (err) {
        console.log(err);
        return;
      }
      const token = session.getIdToken().getJwtToken();
      const headers = new Headers();
      headers.append('Authorization', token);
      this.http.get('https://raselh0uc1.execute-api.us-east-1.amazonaws.com/v1/employees', {headers: headers})
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );

    });



  }

}
