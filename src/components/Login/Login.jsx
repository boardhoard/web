import React from 'react';

import { GoogleLogin } from 'react-google-login';

export default ({onSuccess}) => {
    const responseGoogle = (response) => {
        console.log(response);
      }
    return (
        <GoogleLogin
            clientId="613355954816-imdua2qvq8b6d68noo8r7trmcrpfl3kt.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
        />
    )
};