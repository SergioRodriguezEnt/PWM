import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {Login} from './pages/login/login';
import {Outfit} from './pages/outfit/outfit';
import {Profile} from './pages/profile/profile';
import {Register} from './pages/register/register';
import {Update} from './pages/update/update';
import {Upload} from './pages/upload/upload';
import {Search} from './pages/search/search';
import {GuestGuard} from './core/guards/guest.guard';
import {AuthGuard} from './core/guards/auth.guard';
import {OutfitEditGuard} from './core/guards/outfitEdit.guard';
import {ProfileEditGuard} from './core/guards/profileEdit.guard';
import {Favorites} from './pages/favorites/favorites';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
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
    canActivate: [GuestGuard],
    title: 'Outfitera | Login',
    component: Login
  },
  {
    path: 'register',
    pathMatch: 'full',
    canActivate: [GuestGuard],
    title: 'Outfitera | Register',
    component: Register
  },
  {
    path: 'outfit/:id',
    pathMatch: 'full',
    title: 'Outfitera | Outfit',
    component: Outfit
  },
  {
    path: 'profile/:id',
    pathMatch: 'full',
    title: 'Outfitera | Profile',
    component: Profile
  },
  {
    path: 'search',
    pathMatch: 'full',
    title: 'Outfitera | Search',
    component: Search
  },
  {
    path: 'update/:id',
    pathMatch: 'full',
    canActivate: [ProfileEditGuard],
    title: 'Outfitera | Update',
    component: Update
  },
  {
    path: 'upload',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    title: 'Outfitera | Upload',
    component: Upload
  },
  {
    path: 'upload/:id',
    pathMatch: 'full',
    canActivate: [OutfitEditGuard],
    title: 'Outfitera | Edit Outfit',
    component: Upload
  },
  {
    path: 'favorites',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    title: 'Outfitera | Favorites',
    component: Favorites
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

