import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogTestComponent } from 'src/app/modal/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/service/authService/auth.service';
import { JobService } from 'src/app/service/jobService/job.service';

@Component({
  selector: 'app-view-user-jobs',
  templateUrl: './view-user-jobs.component.html',
  styleUrls: ['./view-user-jobs.component.css']
})
export class ViewUserJobsComponent implements OnInit {
  public userEmail: string;
  public dataSource: any;
  displayedColumns: string[] = ['jobTitle', 'location', 'companyname', 'getdetails', 'jobExpire'];

  selection = new SelectionModel<Element>(true, []);



  constructor(private jobService: JobService, private authService: AuthService,
    private router: Router, private toastrService: ToastrService, public dialog: MatDialog) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.getUserEmail();
    this.getUsersJobs();
  }

  public getUserEmail() {
    this.userEmail = this.authService.getUserEmail();
    return this.userEmail;
  }
  public getUsersJobs() {
    this.jobService.getjobsByUser(this.userEmail).subscribe((res) => {
      if (res) {
        this.dataSource = res.allJobsByUser.filter(a => a.jobExpire === false);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  getRecord(jobId) {
    var result = this.dataSource.filter(a => a.jobRequisitionId === jobId);
    this.router.navigate(['/job-description/' + jobId], { state: { data: result[0] } });
  }

  public openDialog(jobId): void {
    const dialogRef = this.dialog.open(ConfirmDialogTestComponent, {
      width: '450px',
      data: { message: "Are you sure. Do you want to expire this job application." }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.jobExpire(jobId);
      }
    });
  }

  jobExpire(jobId) {
    this.jobService.setJobExpire(jobId).subscribe((res) => {
      if (res) {
        this.toastrService.success(res.message);
        this.getUsersJobs();
      }
    });
  }
}
