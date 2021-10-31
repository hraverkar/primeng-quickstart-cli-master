import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { JobService } from 'src/app/service/jobService/job.service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public selectedValueForYear: string;
  public selectedValueForMonth: string;
  public selectedCategory: string;

  public categories: any;
  public category: any;
  public keySkills: any;
  public Years = [];
  public Months = [];

  public locations: any;


  control = new FormControl();
  filteredkeySkills: Observable<string[]>;
  filteredLocations: Observable<string[]>;

  public constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.setYears();
    this.getJobLocation();
    this.getKeySkills();
    this.getJobCategory();
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.keySkills.filter(street => this._normalizeValue(street.skillname).includes(filterValue));
  }
  private _filtered(value: string): string[] {
    const filterValued = this._normalizeValue(value);
    return this.locations.filter(city => this._normalizeValue(city.cityname).includes(filterValued));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  public getJobLocation(): void {
    this.jobService.getJobLocation()
      .subscribe((res: any) => {
        this.locations = res.location;
        this.filteredLocations = this.control.valueChanges.pipe(
          startWith(''),
          map(value => this._filtered(value)));
      });
  }

  public getKeySkills(): void {
    this.jobService.getKeySkills()
      .subscribe((res: any) => {
        this.keySkills = res.keyskill;
        this.filteredkeySkills = this.control.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      });
  }

  public getJobCategory(): void {
    this.jobService.getCategory()
      .subscribe((res) => {
        this.categories = res.Category;
      });
  }
  // public getJobType(): void {
  //   this.jobService.getJobType()
  //     .subscribe((res: HttpResponse<any>) => {
  //       this.category = res.body.JobType;
  //       console.log(this.category);
  //     });
  // }


  // public getJobInformation(): void {
  //   this.jobService.getJobInformation()
  //     .subscribe((res: HttpResponse<any>) => {
  //       this.category = res.body;
  //       console.log(this.category);
  //     });
  // }

  public setYears() {
    for (let i = 0; i <= 20; i++) {
      this.Years.push({
        value: i, viewValue: i + " Year"
      })
    };

    for (let j = 0; j <= 12; j++) {
      this.Months.push({
        value: j, viewValue: j + " Month"
      })
    };
  }

}
