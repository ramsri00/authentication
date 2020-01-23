import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgIdleModule } from '@ng-idle/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotUseridComponent } from './forgot-userid/forgot-userid.component';
import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { AuthGaurdService } from './auth-gaurd.service';
import { Ng2FileSizeModule } from 'ng2-file-size';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ForgotUseridComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2FileSizeModule,
    NgIdleModule.forRoot()
  ],
  providers: [CookieService, AuthService, AuthGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule {}
