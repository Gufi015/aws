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
      this.http.get('https://4w602k7m0h.execute-api.us-east-1.amazonaws.com/dev/employees')
        .subscribe((response) => {
            console.log(response);
            const empleados = response
            this.employees = empleados['_body'];
            console.log('esta es la respuesta' + JSON.stringify(this.employees));
          },
          error => {
            console.log(error);
          }
        );

    //});



  }

}
