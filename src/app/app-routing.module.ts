import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
//   path: 'register', component: RegisterComponent
// }, {
//   path: 'job-search', component: JobSearchComponent, canActivate: [AuthGuard]
// }, {
//   path: 'job-list', component: JobListComponent, canActivate: [AuthGuard]
// }, {
//   path: 'job-history', component: JobHistoryComponent, canActivate: [AuthGuard]
// }, {
//   path: 'job-description/:id', component: JobDescriptionComponent, canActivate: [AuthGuard]
// }, {
//   path: 'signup', component: SignUpComponent
// }, {
//   path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
 {
   path: 'login', component: LoginComponent
}, {
  path: '', component: LoginComponent
// }, {
//   path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
// }, {
//   path: 'resume', component: ResumeComponent, canActivate: [AuthGuard]
// }, {
//   path: 'recruiterhome', component: RecruiterHomeComponent, canActivate: [AuthGuard]
// }, {
//   path: 'adminhome', component: AdminHomeComponent, canActivate: [AuthGuard]
// }, {
//   path: 'job-addition', component: JobAdditionComponent, canActivate: [AuthGuard]
// }, {
//   path: 'view-all-user', component: ViewAllUserComponent, canActivate: [AuthGuard]
// }, {
//   path: 'view-user-jobs', component: ViewUserJobsComponent, canActivate: [AuthGuard]
// }, {
//   path: 'view-users', component: ViewUsersComponent, canActivate: [AuthGuard]
// }, {
//   path: 'forgot-Password', component: ForgotPasswordComponent
// },{
//   path: 'contact', component: ContactComponent
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
