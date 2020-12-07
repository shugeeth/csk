import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentEventGridComponent } from './student-event-grid/student-event-grid.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReportComponent } from './report/report.component';
import { AlertComponent } from './_components/alert/alert.component';
import { StudentAccessGridComponent } from './student-access-grid/student-access-grid.component';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    StudentEventGridComponent,
    ChangePasswordComponent,
    ReportComponent,
    AlertComponent,
    StudentAccessGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppBootstrapModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiSwitchModule.forRoot({
      size: 'small',
      color: '#17A2B8',
      switchColor: '#ffc107',
      defaultBgColor: '#DC3545',
      defaultBoColor : '#000000',
      checkedLabel: 'ON',
      uncheckedLabel: 'OFF'
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
