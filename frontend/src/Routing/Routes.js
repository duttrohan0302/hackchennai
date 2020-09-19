import React from 'react';
import { Switch } from 'react-router-dom';
import HomePage from '../Components/HomePage';
import Districts from '../Components/Districts';
import DashBoard from '../Components/DashBoard';

import DefaultLayoutRoute from './DefaultLayout';
import ParticularDistrict from '../Components/ParticularDistrict';


const Routes =  ()  => {
  return (
      <Switch>
        <DefaultLayoutRoute exact path="/" component={HomePage} />
        <DefaultLayoutRoute exact path="/allDistricts" component={Districts} />
        <DefaultLayoutRoute exact path="/dashboard" component={DashBoard} />
        <DefaultLayoutRoute exact path="/district/:name" component={ParticularDistrict} />
      </Switch>
  );
};

export default Routes;
