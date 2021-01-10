import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import axios from 'axios'
import { Nav, Alert } from '@/_components';
import { Home } from '@/home';
import { Products } from '@/products';

import {PrivateRoute} from '@/Utils';
import {PublicRoute} from '@/Utils';
import { getToken, removeUserSession, setUserSession, getUser } from '@/Utils';
import Login from '@/Login'
import Signup from '@/Signup'

function App() {
    const { pathname } = useLocation();  
    const [authLoading, setAuthLoading] = useState(true);

  // console.log(getUser())
  useEffect(() => {
    const token = getToken();
    // console.log(token)
    removeUserSession();
    if (!token) {
      return;
    }
    if(token){
      console.log(getUser())
    }
    axios.get('http://localhost:1337/verifyToken', {headers:{'Authorization': token}}).then(response => {
    console.log("from token verification", response)
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }


    return (
        <div className="app-container bg-light">
            <BrowserRouter>
            <Nav />
            <Alert />
            <div className="container pt-4 pb-4">
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <PrivateRoute path="/products" component={Products} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
            </BrowserRouter>
        </div>
    );
}

export { App }; 