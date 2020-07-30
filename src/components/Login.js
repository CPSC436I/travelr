import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import ButtonList from '../components/buttons/ButtonList';
import axios from 'axios';
import UserProvider from '../contexts/UserProvider';
import { useHistory } from "react-router-dom";

function Login() {
  let history = useHistory();
  const [userData, setUser] = useContext(UserProvider.context);

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const register = () => {
    axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: 'http://localhost:9000/auth/register'
    }).then((res) => console.log(res));
  };
  const login = () => {
    axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: 'http://localhost:9000/auth/login'
    }).then((res) => {
      console.log(res)
      setUser(res);
      history.push('/');
    });
  };
  const getUser = () => { 
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:9000/auth/user'
    }).then((res) => console.log(res));
  };

  return (
    <div>
      <ButtonList />
    </div>
  );
}

export default Login;