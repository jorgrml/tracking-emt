import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { filter, map, switchMap, concatMap, catchError, delay } from "rxjs/operators";
import { of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as acciones from "./tracking.actions";

@Injectable()
export class TrackingEffects {
  constructor(private actions$: Actions,
    private http: HttpClient) { }



  @Effect()
  refrescarDatos$ = this.actions$.pipe(
    ofType(acciones.TrackingActionTypes.RequestUpdates),
    map((action: acciones.RequestUpdates) => action.payload),
    concatMap((payload: any) =>
      this.http.post("https://datosabiertos.malaga.eu/recursos/transporte/EMT/EMTlineasUbicaciones/lineasyubicaciones.geojson", {})
        .pipe(map((response: any) => {
         return new acciones.RefreshMap(response)
        })))
  );

}
