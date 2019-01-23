import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { routes } from './tracking.routing';

import { TrackingComponent } from './tracking.component';
import * as fromTracking from './tracking.reducer';
import { EffectsModule } from "@ngrx/effects";
import {TrackingEffects} from './tracking.effects';
import {MaterialModule} from './../../material.module';
@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('TrackingModule', {
            Tracking: fromTracking.TrackingReducer
        }),
        EffectsModule.forFeature([TrackingEffects]),
    ],
    declarations: [
        TrackingComponent
    ],
    providers: [
    ]
})
export class TrackingModule { }
