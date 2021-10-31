import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-view-all-user',
  templateUrl: './view-all-user.component.html',
  styleUrls: ['./view-all-user.component.css']
})
export class ViewAllUserComponent implements OnInit {
  private timeInterval: Subscription;
  constructor(private userService: UserService) { }

  public dataSource: any;
  displayedColumns: string[] = ['username', 'email', 'downloadResume'];

  selection = new SelectionModel<Element>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public ngOnInit(): void {
    this.getAllUsers();
  }
  public getAllUsers() {
    this.timeInterval = interval(3000)
      .pipe(
        startWith(0),
        switchMap(() => this.userService.getUpdatedResume())
      ).subscribe((res) => {
        this.dataSource = res.usersWithResume;
        this.dataSource.paginator = this.paginator;
      }
      );
  }

  public ngOnDestroy(): void {
    this.timeInterval.unsubscribe();
  }

  public getResume(filename, resume) {
    const TYPED_ARRAY = new Uint8Array(resume.data);
    const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
    this.blobToSaveAs(filename, STRING_CHAR)

  }

  blobToSaveAs(fileName, source) {
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}`
    link.click();
  }
}
