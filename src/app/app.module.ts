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
import { ConfirmationService, MessageService } from 'primeng/api';

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

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent
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
        ToastModule,
        CardModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [LoginService, AuthGuard, JobService, ProfileService, MessageService, {
        provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true
    }],

    bootstrap: [AppComponent]
})
export class AppModule { }
