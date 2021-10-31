import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { constantFile } from 'src/app/core/constant/constant-file';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public API = "http://localhost:3000/api";
  constructor(private _httpClient: HttpClient) { }

  public signup(data, userType, isActive): Observable<any> {
    return this._httpClient.post<any>(this.API+ "/auth/signup", {
      username: data.username, email: data.email, password: data.password, roles: userType, isActive: isActive
    }, { headers: constantFile.getHeaders() });
  }

  public login(data): Observable<any> {
    return this._httpClient.post<any>(this.API+ "/auth/signin", {
      username: data.username, password: data.password
    }, { headers: constantFile.getHeaders() });
  }

  public forgotPassword(password, email): Observable<any> {
    return this._httpClient.post<any>(this.API+ "/auth/forgotPassword", {
      password: password, email: email
    });
  }

  public validateEmail(email): Observable<any> {
    return this._httpClient.get<any>(this.API+ "/auth/varifyEmail?email=" + email);
  }
}

