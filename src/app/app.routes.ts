import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {Login} from './pages/login/login';
import {Outfit} from './pages/outfit/outfit';
import {Profile} from './pages/profile/profile';
import {Register} from './pages/register/register';
import {Update} from './pages/update/update';
import {Upload} from './pages/upload/upload';
import {Search} from './pages/search/search';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    pathMatch: 'full',
    title: 'Outfitera | Home',
    component: Home
  },
  {
    path: 'login',
    pathMatch: 'full',
    title: 'Outfitera | Login',
    component: Login
  },
  {
    path: 'outfit',
    pathMatch: 'full',
    title: 'Outfitera | Outfit',
    component: Outfit
  },
  {
    path: 'profile',
    pathMatch: 'full',
    title: 'Outfitera | Profile',
    component: Profile
  },
  {
    path: 'register',
    pathMatch: 'full',
    title: 'Outfitera | Register',
    component: Register
  },
  {
    path: 'search',
    pathMatch: 'full',
    title: 'Outfitera | Search',
    component: Search
  },
  {
    path: 'update',
    pathMatch: 'full',
    title: 'Outfitera | Update',
    component: Update
  },
  {
    path: 'upload',
    pathMatch: 'full',
    title: 'Outfitera | Upload',
    component: Upload
  },
];

