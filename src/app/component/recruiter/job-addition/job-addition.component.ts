import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/authService/auth.service';
import { JobService } from 'src/app/service/jobService/job.service';

@Component({
  selector: 'app-job-addition',
  templateUrl: './job-addition.component.html',
  styleUrls: ['./job-addition.component.css']
})
export class JobAdditionComponent implements OnInit {
  public userEmail: string;

  public constructor(private jobService: JobService, private toastrService: ToastrService, private authService: AuthService) { }

  public ngOnInit(): void {
    this.getUserEmail();
  }

  public getUserEmail() {
    this.userEmail = this.authService.getUserEmail();
    return this.userEmail;
  }

  public jobAdditionForm = new FormGroup({
    jobTitle: new FormControl(),
    jobRequisitionId: new FormControl(),
    location: new FormControl(),
    jobType: new FormControl(),
    designation: new FormControl(),
    companyname: new FormControl(),
    entity: new FormControl(),
    category: new FormControl(),
    skills: new FormControl(),
    responsibilities: new FormControl(),
    roleRequirement: new FormControl(),
    qualification: new FormControl(),
    notes: new FormControl(),
    flyer: new FormControl()
  });

  public onJobAddition() {
    this.jobService.jobAddition(this.jobAdditionForm.value, this.userEmail, false).subscribe((res) => {
      if (res) {
        this.toastrService.success("Job successfully added");
      }
    });
  }
}
