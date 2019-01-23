import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';

import { MaterialModule } from './material.module';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';

import { DEV_REDUCERS, syncReducers, resetOnLogout, AppState } from './reducers';
import { RouterEffects } from './effects/router';
import { LoadingIndicatorEffects } from './spinner/spinner.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const metaReducers: MetaReducer<AppState>[] = ENV === 'development' ?
  [...DEV_REDUCERS, resetOnLogout] : [resetOnLogout];

export const APP_IMPORTS = [
  EffectsModule.forRoot([
    RouterEffects,
    LoadingIndicatorEffects
  ]),
  MaterialModule,
  ReactiveFormsModule,
  StoreModule.forRoot(syncReducers, { metaReducers, }),
  StoreDevtoolsModule.instrument({
    maxAge: 10
  }),
  StoreRouterConnectingModule.forRoot({
    stateKey: 'router' // name of reducer key
  }),
  TransferHttpModule
];
