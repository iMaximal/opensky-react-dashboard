import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import * as FlightsActions from '../../store/actions/flights.actions';
import * as FlightsEffects from '../../store/effects/flights.effects';
import ModalAirportFlights from '../ModalAirportFlights/ModalAirportFlights';

class AirportsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedAirport: null,
        };

        this.minutes = 15;
    }

    showAirportInfo = (event) => {
        const { icao } = event.currentTarget.dataset;

        this.props.effects.fetchAirportInfo({
                icao,
                minutes: this.minutes,
            },
            true);

        this.setState({
            checkedAirport: icao,
        });
    };

    closeModal = () => {
        this.setState({
            checkedAirport: null,
        });
        this.minutes = 15;
    };

    changeMinutes = (minutes) => {
        this.minutes = minutes;
        this.props.effects.fetchAirportInfo({
                icao: this.state.checkedAirport,
                minutes: this.minutes,
            },
            true);
    };

    render() {
        const { checkedAirport } = this.state;

        return (
            <>
                <ListGroup>
                    { this.props.airports.map(airport => (
                        <ListGroupItem
                            key={ airport.icao }
                            data-icao={ airport.icao }
                            onClick={ this.showAirportInfo }
                            header={ airport.name }
                        >
                            IATA: { airport.iata }
                        </ListGroupItem>
                    )) }
                </ListGroup>
                { checkedAirport
                && this.props.flights[checkedAirport]
                && <ModalAirportFlights
                    icao={ checkedAirport }
                    airportData={ this.props.flights[checkedAirport] }
                    onClose={ this.closeModal }
                    onChangeMinutes={ this.changeMinutes }
                /> }
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        flights: state.flights
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(FlightsActions, dispatch),
        effects: bindActionCreators(FlightsEffects, dispatch),
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AirportsList);
