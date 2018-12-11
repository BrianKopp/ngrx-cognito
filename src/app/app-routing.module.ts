import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { HomeComponent } from './components/home/home.component';
import { RequireLoggedInGuardService, RequireLoggedOutGuardService } from 'ngrx-cognito';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RequireLoggedOutGuardService]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [RequireLoggedOutGuardService]
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [RequireLoggedInGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
