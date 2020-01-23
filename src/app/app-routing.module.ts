import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';
import { ForgotUseridComponent } from './forgot-userid/forgot-userid.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGaurdService } from './auth-gaurd.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    children: [{ path: 'reset-password', component: ResetPasswordComponent }]
  },
  {
    path: 'forgot-userid',
    component: ForgotUseridComponent
  },
  { path: 'change-password', component: ChangePasswordComponent },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGaurdService]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {}
}
