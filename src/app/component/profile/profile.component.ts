import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/authService/auth.service';
import { ProfileService } from 'src/app/service/profileService/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private email: string;
  constructor(private profileService: ProfileService, private authService: AuthService, 
    private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.email = this.authService.getUserEmail();
    this.getProfile();
  }

  public updateProfileForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    fullname: new FormControl(),
    address: new FormControl()
  });

  public userProfileUpdate() {
    this.profileService.updateProfile(this.updateProfileForm.value, this.email).subscribe((res) => {
      this.getProfile();
      this.toastrService.success("User profile updated");
    });
  }

  public getProfile() {
    this.profileService.getProfileInfo(this.email).subscribe((res) => {
      this.updateProfileForm = this.formBuilder.group(res);
      console.log(res);
    });
  }
}
