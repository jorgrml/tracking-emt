import { Action } from "@ngrx/store";

export const SHOW_SPINNER = "[UI] Show loading spinner";
export const HIDE_SPINNER = "[UI] Hide loading spinner";

export class ShowSpinner implements Action {
  readonly type = SHOW_SPINNER;

  constructor(public payload: any) {}
}

export class HideSpinner implements Action {
  readonly type = HIDE_SPINNER;

  constructor(public payload: any) {}
}

export type SpinnerAction = ShowSpinner | HideSpinner;
