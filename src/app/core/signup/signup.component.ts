import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/loginService/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public userType: string = "User";
  public isActive: boolean = false;
  public isLoading = false;
  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) { }
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  userTypes: string[] = ['User', 'Recruiter', 'Admin'];
  public signupForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  ngOnInit(): void {
  }

  onRegister(): void {
    this.isLoading = true;
    console.log('login related data', this.signupForm.value, this.userType, this.isActive);
    if (this.userType.toLowerCase() === 'user') {
      this.isActive = true;
    }
    this.loginService.signup(this.signupForm.value, [this.userType.toLowerCase()], this.isActive).subscribe((res) => {
      console.log(res);
      this.signupForm.reset();
      this.router.navigate(["/login"])
      this.isLoading = false;
    });
  }

}

