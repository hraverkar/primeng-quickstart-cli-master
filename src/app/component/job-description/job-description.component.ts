import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/authService/auth.service';
import { JobService } from 'src/app/service/jobService/job.service';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css']
})
export class JobDescriptionComponent implements OnInit {
  public data: any;
  
  constructor(private router: Router, private authService: AuthService, private jobService: JobService,
     private toastrService: ToastrService) {
    this.data = this.router.getCurrentNavigation().extras.state.data;
  }

  ngOnInit(): void {
  
  }

  public applyJob(id: string): void {
    const email = this.authService.getUserEmail();
    const data = { email: email, jobRequisitionId: id};
    this.jobService.setJobApplied(data)
    .subscribe(res => {
      if(res){
        this.toastrService.success("You have successfully applied for this job");
        this.router.navigate(['/job-history']);
      }
    });
  }

  public hasAccessTokenAndValidRole(): boolean {
    const role = sessionStorage.getItem("ROLES");
    if (sessionStorage.hasOwnProperty("ACCESS_TOKEN") && role === "ROLE_USER") {
      return true;
    }
    return false;
  }
}
