import { createAction } from 'redux-act';

export const fetchFlightsListStartAction = createAction('fetch flights list  :: start');
export const fetchFlightsListSuccessAction = createAction('fetch flights list  :: success');
export const fetchFlightsListErrorAction = createAction('fetch flights list  :: error');
