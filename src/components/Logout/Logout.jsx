import React from 'react';

import { GoogleLogout } from 'react-google-login';


export default () => {
    return (
        <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={()=>{}}
        />
    )
};