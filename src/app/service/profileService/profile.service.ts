import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constantFile } from 'src/app/core/constant/constant-file';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public API = "http://localhost:3000/api";
  constructor(private _httpClient: HttpClient) { }

  public updateProfile(data, email): Observable<any> {
    return this._httpClient.post<any>(this.API+ "/auth/profile", {
      email: email, fullname: data.fullname, address: data.address
    }, { headers: constantFile.getHeaders() })
  }

  public getProfileInfo(email): Observable<any> {
    return this._httpClient.get<any>(this.API+ "/auth/profile?email=" + email, { headers: constantFile.getHeaders() })
  }

  public uploadResume(data, email): Observable<any> {
    return this._httpClient.post<any>(this.API+ "/auth/resume", {
      resume: data.resume, fileName: data.fileName, email: email
    }, { headers: constantFile.getHeaders() })
  }

  public getUpdatedResume(email): Observable<any> {
    return this._httpClient.get<any>(this.API+ "/auth/resume?email=" + email, { headers: constantFile.getHeaders() })
  }

}
