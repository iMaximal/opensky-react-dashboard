import { validDataFetched } from '../reducers/cache';
import * as FlightsService from '../../services/flights/flights.service';
import {
    fetchFlightsListStartAction,
    fetchFlightsListSuccessAction,
    fetchFlightsListErrorAction,
} from '../actions/flights.actions';

export const fetchAirportInfo = (data, force = false) => (dispatch, getState) => {
    if (validDataFetched(getState().flights, force)) {
        return;
    }

    dispatch(fetchFlightsListStartAction());

    FlightsService.fetchAirportArrivedInfo(data)
        .then((flights) => {
            dispatch(fetchFlightsListSuccessAction({
                icao: data.icao,
                flights,
            }));
        })
        .catch((errors) => {
            dispatch(fetchFlightsListErrorAction(errors));
        });

    FlightsService.fetchAirportDepartureInfo(data)
        .then((flights) => {
            dispatch(fetchFlightsListSuccessAction({
                icao: data.icao,
                flights,
            }));
        })
        .catch((errors) => {
            dispatch(fetchFlightsListErrorAction(errors));
        });
};
