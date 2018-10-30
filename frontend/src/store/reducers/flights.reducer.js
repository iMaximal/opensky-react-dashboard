import { createReducer } from 'redux-act';

import { errorCacheState, fetchingCacheState, initialCacheState, successCacheState } from './cache';
import {
    fetchFlightsListStartAction,
    fetchFlightsListSuccessAction,
    fetchFlightsListErrorAction,
} from '../actions/flights.actions';

export const initialState = {
    // [icao]: {
    //  arrival: [{}],
    //  departure: [{}],
    // }
    ...initialCacheState,
};

const reducer = createReducer({}, initialState);

reducer.on(fetchFlightsListStartAction, (state) =>
    ({ ...state, ...fetchingCacheState }));

reducer.on(fetchFlightsListErrorAction, (state, errors) =>
    ({ ...state, ...errorCacheState(errors) }));

reducer.on(fetchFlightsListSuccessAction, (state, payload) =>
    ({
        ...state,
        [payload.icao]: {
            ...state[payload.icao],
            ...payload.flights,
        },
        ...successCacheState()
    }));

export default reducer;
