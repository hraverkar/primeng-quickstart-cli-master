import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
    this.hasAccessToken();
  }

  ngOnInit(): void { }

  public onMenuButtonClick(key: String) {
    switch (key) {
      case "jobSearch":
        this.router.navigate(["/job-search"]);
        break;
      case "jobList":
        this.router.navigate(["/job-list"]);
        break;
      case "jobDescription":
        this.router.navigate(["/job-description"]);
        break;
      case "jobHistory":
        this.router.navigate(["/job-history"]);
        break;
      case "register":
        this.router.navigate(["/register"]);
        break;
      case "login":
        this.router.navigate(["/login"]);
        break;
      case "signup":
        this.router.navigate(["/signup"]);
        break;
      case "jobAddition":
        this.router.navigate(["/job-addition"]);
        break;
      case "viewAllUser":
        this.router.navigate(["/view-all-user"]);
        break;
      case "view-user-jobs":
        this.router.navigate(["/view-user-jobs"]);
        break;
      case "viewAll":
        this.router.navigate(["/view-users"]);
        break;
      case "contact":
        this.router.navigate(["/contact"]);
        break;
    }
  }

  public hasAccessTokenAndValidRole(): boolean {
    const role = sessionStorage.getItem("ROLES");
    if (sessionStorage.hasOwnProperty("ACCESS_TOKEN") && role === "ROLE_USER") {
      return true;
    }
    return false;
  }

  public hasAccessTokenAndValidRecruiterRole(): boolean {
    const role = sessionStorage.getItem("ROLES");
    if (sessionStorage.hasOwnProperty("ACCESS_TOKEN") && role === "ROLE_RECRUITER") {
      return true;
    }
    return false;
  }

  public hasAccessTokenAndValidAdminRole(): boolean {
    const role = sessionStorage.getItem("ROLES");
    if (sessionStorage.hasOwnProperty("ACCESS_TOKEN") && role === "ROLE_ADMIN") {
      return true;
    }
    return false;
  }
  public hasAccessToken(): boolean {
    if (sessionStorage.hasOwnProperty("ACCESS_TOKEN")) {
      return true;
    }
    return false;
  }
}

