import React from 'react';

import AuthForm from './components/AuthForm/AuthForm';
import Dashboard from './containers/Dashboard/Dashboard';

const App = (props) => (
    <div>
        {
            props.auth.loggedIn ? <Dashboard {...props} /> : <AuthForm {...props} />
        }
    </div>
);

export default App;
