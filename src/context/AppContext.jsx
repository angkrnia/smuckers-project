import React, { createContext, useContext, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppContext = createContext();

export default function useAppContext() {
  return useContext(AppContext);
}

const URL = 'http://13.228.170.117:8000/';

export function ContextProvider({ children }) {
  const initName = () => {
    try {
      return localStorage.getItem('authentications')
        ? jwt_decode(JSON.parse(localStorage.getItem('authentications')))
        : '';
    } catch (error) {
      console.log(error);
      return '';
    }
  };
  const navigate = useNavigate();
  const [username, setUsername] = useState(initName());
  const [authentications, setAuthentications] = useState(
    localStorage.getItem('authentications')
      ? JSON.parse(localStorage.getItem('authentications'))
      : ''
  );

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${URL}/login`, {
        username: e.target[0].value,
        password: e.target[1].value,
      });
      if (data?.access_token) {
        setAuthentications(data.access_token);
        setUsername(jwt_decode(data.access_token));
        localStorage.setItem(
          'authentications',
          JSON.stringify(data.access_token)
        );
        navigate('/dashboard');
      }
      return data;
    } catch (error) {
      return error;
    }
  };

  const logoutHandler = async () => {
    setAuthentications('');
    setUsername('');
    localStorage.removeItem('authentications');
    navigate('/');
  };

  const valueData = {
    isLogin: !!(authentications && username),
    username,
    loginHandler,
    logoutHandler,
  };

  return (
    <AppContext.Provider value={valueData}>{children}</AppContext.Provider>
  );
}
