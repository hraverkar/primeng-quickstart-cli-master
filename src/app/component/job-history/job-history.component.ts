import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/service/authService/auth.service';
import { JobService } from 'src/app/service/jobService/job.service';
import { ConfirmDialogTestComponent } from 'src/app/modal/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.component.html',
  styleUrls: ['./job-history.component.css']
})
export class JobHistoryComponent implements OnInit {

  constructor(private jobService: JobService, private authService: AuthService, private _toastrService: ToastrService,
    public dialog: MatDialog) { }
  public appliedJob: any;
  public allJobs: any;
  public data: any;
  public userEmail: string;

  ngOnInit(): void {
    this.getUserEmail();
    this.forkCall();
  }

  public forkCall() {
    forkJoin({
      requestOne: this.jobService.getAppliedJobsByUserEmail(this.userEmail),
      requestTwo: this.jobService.getJobInformation()
    })
      .subscribe(({ requestOne, requestTwo }) => {
        this.appliedJob = requestOne.jobhistory;
        this.allJobs = requestTwo.allJobs;
        this.filterResult();
      });
  }

  public getUserEmail() {
    this.userEmail = this.authService.getUserEmail();
    return this.userEmail;
  }

  public filterResult() {
    this.data = this.allJobs.filter(o1 => this.appliedJob.some(o2 => o1.jobRequisitionId === o2.jobRequisitionId));
  }

  public openDialog(id, email): void {
    const dialogRef = this.dialog.open(ConfirmDialogTestComponent, {
      width: '450px',
      data: { message: "Are you sure. Do you want to withdraw application." }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onJobWithdrawClick(id, email);
      }
    });
  }

  public onJobWithdrawClick(id, userEmail) {
    this.jobService.deleteJobByJobId(id, userEmail).subscribe(res => {
      if (res) {
        this._toastrService.success("job withidraw");
      }
      this.forkCall();
    });
  }
}
function ConfirmDialogComponent(ConfirmDialogComponent: any, arg1: { width: string; data: { message: string; }; }) {
  throw new Error('Function not implemented.');
}

