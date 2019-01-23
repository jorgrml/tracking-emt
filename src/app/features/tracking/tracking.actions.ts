import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import {ShowLoader,HideLoader} from '../../decorators/index';

export enum TrackingActionTypes {
  RequestUpdates = '[Tracking] Request updates',
  RefreshMap = '[Tracking] Refresh map ',
}

@ShowLoader()
export class RequestUpdates implements Action {
  readonly type = TrackingActionTypes.RequestUpdates;
  constructor(public payload?: any) {}
}

@HideLoader("RefreshMap")
export class RefreshMap implements Action {
  readonly type = TrackingActionTypes.RefreshMap;
  constructor(public payload?: any) {}
}

export type TrackingActions =
  | RequestUpdates
  | RefreshMap;
