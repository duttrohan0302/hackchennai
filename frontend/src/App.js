import React,{useEffect} from 'react';
import Routes from './Routing/Routes';
import { history } from './Helpers';
import { Router,Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Helpers/store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './Utils/setAuthToken';
import { loadUser,logout } from './Actions/authActions';

const tok = localStorage.getItem('token')
if(tok){
  store.dispatch(loadUser(jwt_decode(tok)))
  setAuthToken(tok)
}
// if (tok) {
//   console.log("App.js func called")
//   // Set auth token header auth
//   setAuthToken(tok);
//   // Decode token and get user info and expiration
//   const decoded = jwt_decode(tok);
//   // Set User and isAuthenticated
//   store.dispatch(loadUser(decoded));

//   // Check for expired token
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp > currentTime) {
//     // Logout user
//     store.dispatch(logout());

//     // Redirect to home
//     window.location.href = "/";
//   }
// }

const App = () => {
  
  // useEffect(() => {
  //   // check for token in LS
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //     const decoded = jwt_decode(localStorage.token);
  //     store.dispatch(loadUser(decoded));

  //     // Check for expired token
  //     const currentTime = Date.now() / 1000;
  //     if (decoded.exp > currentTime) {
  //       // Logout user
  //       store.dispatch(logout());

  //       // Redirect to home
  //       window.location.href = "/";
  //     }
  //   }
  //   // log user out from all tabs if they log out in one tab
  //   window.addEventListener('storage', () => {
  //     if (!localStorage.token) store.dispatch(logout());
  //   });
  // }, []);
  return (
      <Provider store={store}>
        <Router history={history}>
            <Switch>
              <Route component = {Routes} />
            </Switch>
        </Router>
      </Provider>
        
    
  );
}

export default App;
