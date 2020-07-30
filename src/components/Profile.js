import React, { useEffect, useState, useContext } from 'react';
import UserProvider from '../contexts/UserProvider';
import { makeStyles } from '@material-ui/core/styles';
// import { Avatar } from '@material-ui/core';
// import { profile } from './Login'
// import { GoogleLogout } from 'react-google-login';

const clientId = "99565761776-86oc4v48e5kfk2sng5kj0duo673ao88r.apps.googleusercontent.com";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    font: {
        fontSize: 30,
        textAlign: 'center',
        padding: 15,
        color: 'gray'
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    }
}));


export default function Profile() {
    // const [selected, setSelected] = useState("All");
    const userData = useContext(UserProvider.context);

    const classes = useStyles();

    // const onSuccess = () => {
    //     alert('Logout made successfully');
    // };

    return (
        <div className={classes.root}>
            {JSON.stringify(userData)}
            {/* <p className={classes.font}> {profile.name} </p>
            <Avatar alt={profile.name} src={profile.imageUrl} className={classes.large} />
            <br></br>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                ></GoogleLogout> */}
        </div>
    );
}