import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    loadComponent: () => {
      return import('./pages/home/home').then((m) => m.Home)
    }
  },
  {
    path: 'home',
    pathMatch: "full",
    loadComponent: () => {
      return import('./pages/home/home').then((m) => m.Home)
    }
  },
  {
    path: 'login',
    pathMatch: "full",
    loadComponent: () => {
      return import('./pages/login/login').then((m) => m.Login)
    }
  },
  {
    path: 'outfit',
    pathMatch: "full",
    loadComponent: () => {
      return import('./pages/outfit/outfit').then((m) => m.Outfit)
    }
  },
  {
    path: 'profile',
    pathMatch: "full",
    loadComponent: () => {
      return import('./pages/profile/profile').then((m) => m.Profile)
    }
  },
  {
    path: 'register',
    pathMatch: "full",
    loadComponent: () => {
      return import('./pages/register/register').then((m) => m.Register)
    }
  },
  {
    path: 'search',
    pathMatch: "full",
    loadComponent: () => {
      return import('./pages/search/search').then((m) => m.Search)
    }
  },
  {
    path: 'update',
    pathMatch: "full",
    loadComponent: () => {
      return import('./pages/update/update').then((m) => m.Update)
    }
  },
  {
    path: 'upload',
    pathMatch: "full",
    loadComponent: () => {
      return import('./pages/upload/upload').then((m) => m.Upload)
    }
  },
];
export default routes

