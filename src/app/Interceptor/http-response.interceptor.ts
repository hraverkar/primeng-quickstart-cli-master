import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";



@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  public constructor(private _toasterService: MessageService, private _injector: Injector, private router: Router) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      retry(1),
      catchError(e => this.handleError(e))
    );
  }

  public handleError(error: HttpErrorResponse) {

    if (error.status === 401) {
      // TODO: Should probably display a user friendly message instead and log the specific error instead
      this._toasterService.add({ severity: 'error', summary: 'Error', detail: `Sorry an error occurred!` });
    } else {
      this.router.navigate(["/login"]);
    }
    return throwError(error);
  }
}