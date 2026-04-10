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
  }
];
export default routes

