import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from './components/Auth/Auth';
import Dashboard from './containers/Dashboard/Dashboard';
import App from './App';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import * as serviceWorker from './serviceWorker';
import { store, history } from './store/store';

const auth = new Auth();

const callbackComponent = () => {
    if (auth.loggedIn) {
        setTimeout(() => history.replace('/'), 500);
        return (
           <div className="container">
               <h4>loading...</h4>
           </div>
        );
    } else {
        return <Redirect to={{ pathname: '/' }} />
    }
};

const AuthRoute = props => {
    const { Component, path } = props;
    return (
        <Route path={path} render={() =>
            auth.loggedIn ?
                <Component /> :
                <Redirect to={{ pathname: '/' }} />
        }
        />
    );
};

auth.checkAuthentication()
    .then(() => {
        render(
            <Provider store={ store }>
                <ConnectedRouter history={ history }>
                    <Switch>
                        <Route exact path='/' render={ () => <App auth={ auth }/> }/>
                        <Route path='/callback' render={ props => callbackComponent(props) }/>
                        <AuthRoute path='/Dashboard' Component={ Dashboard }/>
                        <Route Component={ NotFoundPage }/>
                    </Switch>
                </ConnectedRouter>
            </Provider>,
            document.getElementById('root')
    );
})

serviceWorker.unregister();
