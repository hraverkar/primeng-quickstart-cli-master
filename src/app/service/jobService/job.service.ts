import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { constantFile } from 'src/app/core/constant/constant-file';


@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(private _httpClient: HttpClient) { }
  public API = "http://localhost:3000/api";

  public jobAddition(data, email, jobExpire): Observable<any> {
    return this._httpClient.post<any>(this.API+ '/auth/jobAddition', {
      email: email,
      jobTitle: data.jobTitle,
      jobRequisitionId: data.jobRequisitionId,
      location: data.location,
      jobType: data.jobType,
      designation: data.designation,
      companyname: data.companyname,
      entity: data.entity,
      category: data.category,
      skills: data.skills,
      responsibilities: data.responsibilities,
      roleRequirement: data.roleRequirement,
      qualification: data.qualification,
      notes: data.notes,
      flyer: data.flyer,
      jobExpire: jobExpire
    }, { headers: constantFile.getHeaders() });
  }

  public getjobsByUser(email): Observable<any> {
    return this._httpClient.get<any>(this.API+ '/auth/getJobAddition?email=' + email, {
      headers: constantFile.getHeaders()
    });
  }

  public setJobExpire(jobId): Observable<any> {
    return this._httpClient.post<any>(this.API+ '/auth/setJobIsActive', {
      jobRequisitionId: jobId, jobExpire: true
    }, {
      headers: constantFile.getHeaders()
    });
  }



  public getCategory(): Observable<any> {
    return this._httpClient.get<any>("assets/category.json", {
      headers: constantFile.getHeaders()
    });
  }

  public getJobType(): Observable<any> {
    return this._httpClient.get<any>("assets/jobType.json", {
      params: new HttpParams({}),
      observe: "response"
    });
  }

  public getJobInformation(): Observable<any> {
    return this._httpClient.get<any>(this.API+ "/auth/getAllJobAddition", { headers: constantFile.getHeaders() })
  }

  public getJobLevel(): Observable<any> {
    return this._httpClient.get<any>("assets/jobLevel.json", {
      params: new HttpParams({}),
      observe: "response"
    });
  }

  public getJobLocation(): Observable<any> {
    return this._httpClient.get<any>(this.API+ "/auth/location", { headers: constantFile.getHeaders() });
  }

  public getKeySkills(): Observable<any> {
    return this._httpClient.get<any>(this.API+ "/auth/keyskill", { headers: constantFile.getHeaders() });
  }


  public setJobApplied(data): Observable<any> {
    return this._httpClient.post<any>(this.API+ "/auth/jobapply", {
      jobRequisitionId: data.jobRequisitionId, email: data.email
    }, { headers: constantFile.getHeaders() });
  }

  public getAppliedJobsByUserEmail(email): Observable<any> {
    return this._httpClient.get<any>(this.API+ "/auth/history?email=" + email, { headers: constantFile.getHeaders() });
  }

  public deleteJobByJobId(jobid, userEmail): Observable<any> {
    return this._httpClient.delete(this.API+ "/auth/withdraw?jobRequisitionId=" + `${jobid}` + "&userEmail=" + `${userEmail}`
      , { headers: constantFile.getHeaders() })
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = "Unknow error!;";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error :${error.error.message}`;
    } else {
      errorMessage = `Error : ${error.status} \nMessage :${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
