import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JobService } from 'src/app/service/jobService/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public category: any;

  public jobLevels: any;
  public jobTypes: any;
  public jobInformation: any;
  public categories: any;
  public jobInfo: any;

  public selectedjobLevel: string;
  public selectedjobType: string;
  public selectedJobInformation: string;
  public selectedCategory: string;

  constructor(private jobService: JobService, private router: Router) { }
  ngOnInit(): void {
    this.getJobCategory();
    this.getJobType();
    this.getJobInformation();
    this.getJobLevel();
    this.isSearchDisabled();
  }

  drop(event: CdkDragDrop<any>) {
  }
  public getJobCategory(): void {
    this.jobService.getCategory().pipe(takeUntil(this.destroy$))
      .subscribe((res:any) => {
        this.categories = res.Category;
      });
  }

  public getJobType(): void {
    this.jobService.getJobType().pipe(takeUntil(this.destroy$))
      .subscribe((res:any) => {
        this.jobTypes = res.body.JobType;
      });
  }

  public getJobInformation(): void {
    this.jobService.getJobInformation().pipe(takeUntil(this.destroy$))
      .subscribe((res:any) => {
        this.jobInformation = res.allJobs;
        this.jobInfo = this.jobInformation;
      });
  }

  public getJobLevel(): void {
    this.jobService.getJobLevel().pipe(takeUntil(this.destroy$))
      .subscribe((res:any) => {
        this.jobLevels = res.body.Designation;
      });
  }

  public onClear(): void {
    this.selectedjobLevel = undefined;
    this.selectedjobType = undefined;;
    this.selectedCategory = undefined;
    this.jobInformation = this.jobInfo;
  }

  public onSearch(): void {
    let one = this.selectedjobLevel;
    let two = this.selectedjobType;
    let three = this.selectedCategory;

    console.log(one + "  " + two + "   " + three);
    // this.jobInformation.find(x => x. === )
    var result = this.jobInformation.filter(function (v, i) {
      return (v.Category === three || v.JobType === two || v.Designation === one);
    });
    this.jobInformation = result;
  }

  public fullJobDescription(id: string): void {
    console.log(id);
    var result = this.jobInformation.find(a => a.jobRequisitionId === id);
    this.router.navigate(['/job-description/' + id], { state: { data: result } });
  }

  public isSearchDisabled(): boolean {
    if (this.selectedjobLevel !== undefined || this.selectedjobType !== undefined || this.selectedCategory !== undefined) {
      return false;
    }
    return true;
  }
}