import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { filter, map } from "rxjs/operators";
import { ShowSpinner, HideSpinner } from "./spinner.actions";

@Injectable()
export class LoadingIndicatorEffects {
  constructor(private actions$: Actions) { }

  @Effect()
  showLoader$ = this.actions$.pipe(
    filter((action: any) => (action && action.showLoader ? action : null)),
    map((action: any) => new ShowSpinner(action))
  );

  @Effect()
  hideLoader$ = this.actions$.pipe(
    filter((action: any) => (action && action.triggerAction ? action : null)),
    map((action: any) => new HideSpinner(action))
  );
}
