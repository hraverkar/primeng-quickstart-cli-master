import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUsersComponent } from './component/admin/view-users/view-users.component';
import { JobDescriptionComponent } from './component/job-description/job-description.component';
import { JobHistoryComponent } from './component/job-history/job-history.component';
import { JobListComponent } from './component/job-list/job-list.component';
import { JobSearchComponent } from './component/job-search/job-search.component';
import { ProfileComponent } from './component/profile/profile.component';
import { JobAdditionComponent } from './component/recruiter/job-addition/job-addition.component';
import { ViewAllUserComponent } from './component/recruiter/view-all-user/view-all-user.component';
import { ViewUserJobsComponent } from './component/recruiter/view-user-jobs/view-user-jobs.component';
import { ResumeComponent } from './component/resume/resume.component';
import { LoginComponent } from './core/login/login.component';
import { SignupComponent } from './core/signup/signup.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'job-search', component: JobSearchComponent, canActivate: [AuthGuard]
  },
  {
    path: 'job-list', component: JobListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'job-history', component: JobHistoryComponent, canActivate: [AuthGuard]
  }, {
    path: 'job-description/:id', component: JobDescriptionComponent, canActivate: [AuthGuard]
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'login', component: LoginComponent
  }, {
    path: '', component: LoginComponent
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'resume', component: ResumeComponent, canActivate: [AuthGuard]
  },
  // {
  //   path: 'recruiterhome', component: RecruiterHomeComponent
  // }, {
  //   path: 'adminhome', component: AdminHomeComponent
  // }, 
  {
    path: 'job-addition', component: JobAdditionComponent, canActivate: [AuthGuard]
  }, {
    path: 'view-all-user', component: ViewAllUserComponent, canActivate: [AuthGuard]
  }, {
    path: 'view-user-jobs', component: ViewUserJobsComponent, canActivate: [AuthGuard]
  }, {
    path: 'view-users', component: ViewUsersComponent, canActivate: [AuthGuard]
  }
  //, {
  //   path: 'forgot-Password', component: ForgotPasswordComponent
  // }, {
  //   path: 'contact', component: ContactComponent
  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
