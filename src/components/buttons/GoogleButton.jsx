import React from 'react';
import GoogleIcon from '../../res/btn_google_signin_light_normal_web.png';

const GoogleButton = () => {

    return (
        <a 
            href={`${process.env.REACT_APP_API_URI}/auth/google`}
        >
            <img src={GoogleIcon} alt="google-icon" />
        </a>
    );
};

export default GoogleButton;