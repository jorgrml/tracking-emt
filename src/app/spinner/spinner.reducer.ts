import * as loadingSpinner from "./spinner.actions";

export interface SpinnerState {
  active: number;
  actionsInProgress: any[];
}
const initialState: SpinnerState = {
  active: 0,
  actionsInProgress: []
};

export function spinnerReducer(state = initialState, action: any): SpinnerState {
  switch (action.type) {
    case loadingSpinner.SHOW_SPINNER: {

      return {
        ...state,
        actionsInProgress: action.payload.type,
        active: 1
      };

    }
    case loadingSpinner.HIDE_SPINNER: {
      return {
        ...state,
        actionsInProgress: action.payload.type,
        active: 0
      };
    }
    default:
      return state;
  }
}
export const isLoadingSpinnerActive = (state: SpinnerState) => state.active;
