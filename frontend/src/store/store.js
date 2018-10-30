import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
} from 'redux';
import reduxThunk from 'redux-thunk';
import {
    routerMiddleware,
    routerReducer,
} from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';

import * as reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

export const store = createStore(
    combineReducers({...reducers, router: routerReducer}),
    composeEnhancers(applyMiddleware(reduxThunk, routerMiddleware(history))),
);
