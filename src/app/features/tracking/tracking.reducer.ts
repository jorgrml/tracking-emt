import { TrackingActions, TrackingActionTypes } from './tracking.actions';
import * as fromRoot from '../../reducers';
export interface TrackingState {
    data: any;
}

const initialState: TrackingState = {
    data: {}
};

export interface State extends fromRoot.AppState {
    TrackingModule: { Tracking: TrackingState };
}

export function TrackingReducer(state: TrackingState = initialState, action: TrackingActions) {
    switch (action.type) {

        case TrackingActionTypes.RefreshMap:
            return {
                ...state,
                data : action.payload.filter((value, index, array) => {
                    return value.codLinea == 25
                }).map((value,index,array) => {
                    let path:any = [];
                    
                    if(state.data){
                        
                        for(let bus of state.data){
                            if(bus.codBus == value.codBus){
                                path = [... bus.path, value.geometry]
                            }
                        }
                       
                    }
                    return {
                        geometry: value.geometry,
                        codLinea: value.codLinea,
                        line: value.line,
                        codBus: value.codBus,
                        sentido: value.sentido,
                        path:path

                    }
                })
                
            };
            
        case TrackingActionTypes.RequestUpdates:
            return {
                ...state,
            };
        default:
            return state;
    }
}

