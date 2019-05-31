import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Http, Headers} from "@angular/http";

@Component({
  selector: 'app-get-employees',
  templateUrl: './get-employees.component.html',
  styleUrls: ['./get-employees.component.css']
})
export class GetEmployeesComponent implements OnInit {

  employees:any=[];
  constructor(private http: Http, private auth: AuthService) { }

  ngOnInit() {

    // this.auth.getAuthenticatedUser().getSession( (err, session) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
      //const token = session.getIdToken().getJwtToken();
      //const headers = new Headers();
      //headers.append('Authorization', token);
      // {headers: headers}
      this.http
        .get(
          "https://f8t05efwi6.execute-api.us-east-1.amazonaws.com/dev-01"
        )
        .subscribe(
          response => {
            console.log(response);
            console.log("hula");
          },
          error => {
            console.log(error);
          }
        );

    //});



  }

}
