import React from 'react';

import Logout from '../../components/Logout/Logout';

const style = {
    parent: {
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
};

const Header = (props) => {
    return (
        <div style={ style.parent } className="page-header">
            <h1>
                Open Sky Dashboard
            </h1>
            <Logout { ...props } />
        </div>

    );
};


export default Header;
