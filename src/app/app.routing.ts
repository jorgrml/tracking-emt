/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';
import { NotFound404Component } from './not-found404.component';

export const routes: Routes = [
  { path: '', loadChildren: './features/tracking/tracking.module#TrackingModule' },
  { path: '**', component: NotFound404Component }
];
