import React, { Component } from 'react';
import { InputLabel, Select, FormControl } from '@material-ui/core';
import { Button } from 'react-bootstrap';

import FlightsTable from '../FlightsTable/FlightsTable';

const style = {
    backdrop: {
        position: 'fixed',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        zIndex: 1000,
        width: '600px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#fff',
        overflow: 'scroll',
        maxHeight: 'calc(100vh - 10px)',
    },
    formControl: {
        minWidth: 120,
    },
    parent: {
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
};

class ModalAirportFlights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 15,
        };
    }

    handleChange = name => event => {
        const { value } = event.target;
        this.setState({ [name]: value }, () => {
            this.props.onChangeMinutes(value);
        });
    };

    render() {
        const { airportData, onClose } = this.props;

        return (
            <div style={ style.backdrop }>
                <div style={ style.content }>
                    <div style={ style.parent } className="page-header">
                        <FormControl style={ style.formControl }>
                            <InputLabel htmlFor="Minutes">Minutes</InputLabel>
                            <Select
                                native
                                value={ this.state.minutes }
                                onChange={ this.handleChange('minutes') }
                                inputProps={ {
                                    name: 'Minutes',
                                    id: 'Minutes',
                                } }
                                style={ {
                                    fontSize: '1.5em',
                                } }
                            >
                                <option value=""/>
                                <option value={ 15 }>Fifteen</option>
                                <option value={ 30 }>Thirty</option>
                                <option value={ 45 }>Forty five</option>
                            </Select>
                        </FormControl>
                        <Button onClick={ onClose }>Close</Button>
                    </div>
                    { airportData && airportData.arrival &&
                        <FlightsTable
                            title="Arrival"
                            data={ airportData.arrival }
                            headers={ ['icao24', 'Time of departure', 'Time of arrival', 'Arrival airport', 'Vehicle'] }
                        />
                    }
                    {airportData && airportData.departure &&
                        <FlightsTable
                            title="Departure"
                            data={ airportData.departure }
                            headers={ ['icao24', 'Time of departure', 'Time of arrival', 'Arrival airport', 'Vehicle'] }
                        />
                    }
                </div>
            </div>
        );
    }
}


export default ModalAirportFlights;
