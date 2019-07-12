import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ThreadsComponent } from './threads/threads.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgModule } from '@angular/core';
import { NewThreadComponent } from './new-thread/new-thread.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';



const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'new-thread', component: NewThreadComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'threads', component: ThreadsComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);