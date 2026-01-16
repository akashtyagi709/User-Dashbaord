import { Routes } from '@angular/router';
import { AddUser } from './Component/add-user/add-user';
import { Dashboard } from './Component/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'adduser',
    component: AddUser,
  },
];
