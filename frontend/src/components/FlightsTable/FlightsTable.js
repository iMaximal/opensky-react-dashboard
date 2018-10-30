import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

const FlightsTable = (props) => {
    let content;
    if (!props.data) {
        content = (
            <tr>'No data'</tr>
        );
    } else {
        content = (
            <>
                { props.data.map((row) => (
                    <tr key={ row.icao24 + row.firstSeen }>
                        <td>{ row.icao24 }</td>
                        <td>{ moment.unix(row.firstSeen).format("YYYY-MM-DD HH:mm") }</td>
                        <td>{ moment.unix(row.lastSeen).format("YYYY-MM-DD HH:mm") }</td>
                        <td>{ row.estArrivalAirport }</td>
                        <td>{ row.callsign }</td>
                    </tr>
                )) }

            </>
        );
    }

    const { headers } = props;

    return (
        <>
            <h2>{ props.title }</h2>
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    {headers.map((el) => <td key={el}>{el}</td>)}
                </tr>
                </thead>
                <tbody>
                { content }
                </tbody>
            </Table>
        </>

    );
};

export default FlightsTable;
