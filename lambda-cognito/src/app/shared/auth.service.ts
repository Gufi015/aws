import { Injectable } from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId : 'us-east-1_p2OJrMbKb', // Your user pool id here
  ClientId : 'dsmu5m595a9dnhkv6hpsu11dv' // Your client id here
};

const userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthService {
  cognitoUser: any;

  constructor() { }

  signUp(email, password) {

    const attributeList = [];

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      this.cognitoUser = result.user;
      console.log(result);
    });

  }

  confirmCode(code) {
    const userData = {
      Username : this.cognitoUser.username,
      Pool : userPool
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('call result: ' + result);
    });
  }

  signIn(email, password){

    const authenticationData = {
      Username : email,
      Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username : email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log("OnSuccess");
        console.log(result);
      },

      onFailure: function(err) {
        console.log(err);
      },

    });




  }

  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }

  signOut() {
  }

}
