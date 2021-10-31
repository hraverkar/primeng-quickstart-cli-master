import { AuthService } from '../service/authService/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (this.authService.getToken()) {
      if (this.authService.getUserName()) {
        return true;
      }
    }
    this.router.navigateByUrl("/login")
    return true;
  }
}
