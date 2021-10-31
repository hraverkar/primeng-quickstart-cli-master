import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constantFile } from 'src/app/core/constant/constant-file';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public API = "http://localhost:3000/api";
  constructor(private _httpClient: HttpClient) { }


  public getUpdatedResume(): Observable<any> {
    return this._httpClient.get<any>(this.API+ "/auth/getAllUserWithResume", { headers: constantFile.getHeaders() })
  }

  public getAllUserRecords(): Observable<any> {
    return this._httpClient.get<any>(this.API+ "/auth/getAllUsers", { headers: constantFile.getHeaders() })
  }

  public setActiveUser(email, value): Observable<any> {
    return this._httpClient.post<any>(this.API+ "/auth/userAuth", {
      email: email, isActive: value
    }, { headers: constantFile.getHeaders() })
  }

  public getAllRole(): Observable<any> {
    return this._httpClient.get<any>(this.API+ "/auth/allRoles", { headers: constantFile.getHeaders() })
  }
}
