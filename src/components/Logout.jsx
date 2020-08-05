import React, {useEffect, useContext} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import UserProvider from '../contexts/UserProvider';


function Logout() {
    
    const [userData, setUser] = useContext(UserProvider.context);

    useEffect(() => {
        axios({
            method: 'GET',
            data: {},
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URI}/auth/logout`
        }).then(res => {
            console.log(res, userData);
            setUser(null);
        });
    });

    return (
        <Redirect to="/" />
    )
}

export default Logout;