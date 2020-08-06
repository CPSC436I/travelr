import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const context = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    console.log('this is the user ', user);

    useEffect(() => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URI}/auth/user`
          }).then((res) => {
              setUser(res.data);
            });
    }, []);

    return (
        <context.Provider value={[user, setUser]}>
            {children}
        </context.Provider>
    );
};

UserProvider.context = context;

export default UserProvider;