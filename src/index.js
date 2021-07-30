import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import AuthService from './service/auth';
import TweetService from './service/tweet';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthErrorEventBus } from './context/AuthContext';
import TokenStorage from './db/token.js';
import Socket from './connection/connect.js';
import socket from 'socket.io-client';
import MyAxios from './service/useAxios.js';


const tokenStorage = new TokenStorage();
const baseURL = process.env.REACT_APP_BASE_URL;
const authErrorEventBus = new AuthErrorEventBus();
const myAxios = new MyAxios(baseURL, tokenStorage, authErrorEventBus);

let socketIO = socket(baseURL);
socketIO.on('connect_error', (error) => {
  console.error(error);
})
socketIO.on('dwitter', (msg) => { console.log(' 듣고 이따 !!!! ', msg)});

const mysocket = new Socket(baseURL, () => tokenStorage.get());
mysocket.onSync('dwitter', (msg)=>{console.log(msg)});

const authService = new AuthService(baseURL, tokenStorage);
const tweetService = new TweetService(myAxios, mysocket);


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App tweetService={tweetService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
