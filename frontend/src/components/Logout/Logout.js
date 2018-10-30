import React from 'react';
import { Button } from 'react-bootstrap';

const Logout = props => (
    <div>
        <Button onClick={ props.auth.logout }>Log Out</Button>
    </div>
);

export default Logout;
