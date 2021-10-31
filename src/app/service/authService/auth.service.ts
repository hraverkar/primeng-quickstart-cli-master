import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getToken() {
    return sessionStorage.getItem("ACCESS_TOKEN");
  }

  public getUserName() {
    return sessionStorage.getItem("USERNAME");
  }

  public getUserEmail() {
    return sessionStorage.getItem("EMAIL");
  }
  
  public getCurrentRole() {
    return sessionStorage.getItem("ROLES");
  }

  // public isAuthenticated(): boolean {
  //   // get the token
  //   const token = this.getToken();
  //   // return a boolean indicating whether or not the token is expired
  //   return tokenNotExpired(token);
  
}
