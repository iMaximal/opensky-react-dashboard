import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import AirportsList from '../../components/AirportsList/AirportsList';
import { airports } from './constants';

class Dashboard extends Component {

    render() {

        return (
            <div className="container">
                <Header { ...this.props } />
                <AirportsList airports={airports} />
            </div>
        );
    }
}

export default Dashboard;
