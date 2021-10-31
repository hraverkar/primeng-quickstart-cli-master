import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/loginService/login.service';
import { FormControl, Validators, FormGroup, FormBuilder } from "@angular/forms";
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router, private toastrService: MessageService) { }
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  public authSubject = new BehaviorSubject(false);
  ngOnInit(): void {
  }

  public onLogin(): void {
    this.loginService.login(this.loginForm.value).subscribe((res) => {
      console.log(res);
      if (res.accessToken === null) {
        this.toastrService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      else if ((res.accessToken && res.username) && res.isActive) {
        sessionStorage.setItem("ACCESS_TOKEN", res.accessToken);
        sessionStorage.setItem("EMAIL", res.email);
        sessionStorage.setItem("ROLES", res.roles);
        sessionStorage.setItem("USERNAME", res.username);
        this.authSubject.next(true);
        this.toastrService.add({ severity: 'success', summary: 'Success', detail: "Welcome " + res.username + " ! You are logged in as " + res.roles[0] });
        if (res.roles[0] === "ROLE_RECRUITER") {
          this.router.navigate(["/job-addition"]);
        } else if (res.roles[0] === "ROLE_ADMIN") {
          this.router.navigate(["/view-users"]);
        } else {
          this.router.navigate(["/job-list"]);
        }
      } else {
        this.toastrService.add({ severity: 'warn', summary: 'Warn', detail: "Please contact administrator to activate your account or Please wait sometime to for account activation." });
      }
    });
  }

  public isAuthenticated() {
    return this.authSubject.asObservable();
  }

  public forgotPassword() {
    this.router.navigate(["/forgot-Password"])
  }
}