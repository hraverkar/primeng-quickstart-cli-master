import { ConfirmDialogTestComponent } from './modal/confirm-dialog/confirm-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './core/login/login.component';
import { ToastModule } from 'primeng/toast';
import { LoginService } from './service/loginService/login.service';
import { JobService } from './service/jobService/job.service';
import { ProfileService } from './service/profileService/profile.service';
import { AuthGuard } from './guard/auth.guard';
import { HttpResponseInterceptor } from './Interceptor/http-response.interceptor';
import { CardModule } from 'primeng/card';
import { SignupComponent } from './core/signup/signup.component';
import { MaterialModule } from './module/material/material.module';
import { JobSearchComponent } from './component/job-search/job-search.component';
import { JobListComponent } from './component/job-list/job-list.component';
import { JobHistoryComponent } from './component/job-history/job-history.component';
import { JobDescriptionComponent } from './component/job-description/job-description.component';
import { ViewUsersComponent } from './component/admin/view-users/view-users.component';
import { JobAdditionComponent } from './component/recruiter/job-addition/job-addition.component';
import { ViewAllUserComponent } from './component/recruiter/view-all-user/view-all-user.component';
import { ViewUserJobsComponent } from './component/recruiter/view-user-jobs/view-user-jobs.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ResumeComponent } from './component/resume/resume.component';
import { FilePickerComponent } from './core/file-picker/file-picker.component';
import { LogoutComponent } from './core/logout/logout.component';
import { ToastrModule } from 'ngx-toastr';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent,
        SignupComponent,
        JobSearchComponent,
        JobListComponent,
        JobHistoryComponent,
        JobDescriptionComponent,
        ViewUsersComponent,
        JobAdditionComponent,
        ViewAllUserComponent,
        ViewUserJobsComponent,
        ConfirmDialogTestComponent,
        ProfileComponent,
        ResumeComponent,
        FilePickerComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ToolbarModule,
        ConfirmDialogModule,
        RatingModule,
        InputNumberModule,
        InputTextareaModule,
        RadioButtonModule,
        ButtonModule,
        AppRoutingModule,
        ToastrModule.forRoot({
            positionClass: "toast-bottom-left",
            timeOut: 5000,
            closeButton: true,
          }),
          BackButtonDisableModule.forRoot({
            preserveScrollPosition: true
          }),
        CardModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: [LoginService, AuthGuard, JobService, ProfileService, MessageService, {
        provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true
    }],

    bootstrap: [AppComponent]
})
export class AppModule { }
