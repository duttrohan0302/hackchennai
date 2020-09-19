import React from 'react';
import Routes from './Routing/Routes';
import { history } from './Helpers';
import { Router,Route, Switch } from 'react-router-dom';

const App = () => {
  
  return (
        <Router history={history}>
            <Switch>
              <Route component = {Routes} />
            </Switch>
        </Router>
    
  );
}

export default App;
