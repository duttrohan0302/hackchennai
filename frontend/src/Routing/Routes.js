import React from 'react';
import { Switch } from 'react-router-dom';
import HomePage from '../Components/HomePage';
import Districts from '../Components/Districts';
import DashBoard from '../Components/DashBoard';
import Login from '../Components/Auth/Login';

import DefaultLayoutRoute from './DefaultLayout';
import PrivateRoute from './PrivateRoute';
import ParticularDistrict from '../Components/ParticularDistrict';


const Routes =  ()  => {
  return (
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <DefaultLayoutRoute exact path="/login" component={Login} />
        <DefaultLayoutRoute exact path="/allDistricts" component={Districts} />
        <DefaultLayoutRoute exact path="/dashboard" component={DashBoard} />
        <DefaultLayoutRoute exact path="/district/:name" component={ParticularDistrict} />
      </Switch>
  );
};

export default Routes;
