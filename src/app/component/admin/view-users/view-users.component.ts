import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Subscription, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, private toastrService: ToastrService) { }
  public dataSource: any;
  public dataSourceDeActive: any;
  public timeInterval: Subscription;
  displayedColumns: string[] = ['username', 'email', 'isActive'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit(): void {
    this.getAllUsersRecord();
  }

  public ngOnDestroy(): void {
    this.timeInterval.unsubscribe();
  }

  public getAllUsersRecord() {
    this.timeInterval = interval(3000)
      .pipe(
        startWith(0),
        switchMap(() => this.userService.getAllUserRecords())
      ).subscribe((res) => {
        this.dataSource = res.users.filter(a=> a.isActive === true);
        this.dataSourceDeActive = res.users.filter(a=> a.isActive === false);
        this.dataSource.paginator = this.paginator;
      });
  }

  public onbtnCheckClick(email, value) {
    this.userService.setActiveUser(email, value).subscribe((res) => {
      this.toastrService.success(res.message);
      this.getAllUsersRecord();
    })
  }

  public onbtnCancelClick(email, value) {
    this.userService.setActiveUser(email, value).subscribe((res) => {
      this.toastrService.success(res.message);
      this.getAllUsersRecord();
    })
  }
}
