import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  public userName: string;
  constructor(private router: Router) { }

  public ngOnInit(): void {
    this.getValidUserName();
  }

  public getValidUserName(): void {
    if (sessionStorage.hasOwnProperty("ACCESS_TOKEN")) {
      const user = sessionStorage.getItem("USERNAME");
      this.userName = user.slice(0, 2).toUpperCase();
    }
  }

  public logout(): void {
    sessionStorage.removeItem("ACCESS_TOKEN");
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }

  public hasAccessToken(): boolean {
    if (sessionStorage.hasOwnProperty("ACCESS_TOKEN")) {
      return true;
    }
    return false;
  }

  public viewProfile() {
    this.router.navigate(["/profile"]);
  }

  public resumeDialog(){
    this.router.navigate(["/resume"]);
  }

  public hasAccessTokenAndValidRole(): boolean {
    const role = sessionStorage.getItem("ROLES");
    if (sessionStorage.hasOwnProperty("ACCESS_TOKEN") && role === "ROLE_USER") {
      return true;
    }
    return false;
  }
}
