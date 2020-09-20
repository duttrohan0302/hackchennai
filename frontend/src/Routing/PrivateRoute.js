import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Components/Spinner';
import NavBar from '../Components/NavBar';
import Alert from '../Components/Alert';
import store from '../Helpers/store';
import { setAlert } from '../Actions/alertActions';

const PrivateLayout = (props) => {
    
    return (
        <div id="wrapper">
            <div className="container-fluid p-0"
              style={{overflowX:'hidden'}}
            >
              <NavBar/>
                <div id="page-wrapper">
                  <div className="row">
                    <div className="col-lg-9 col-md-7 col-sm-12 pb-10"  style={{margin:'40px'}}>
                      <Alert/>
                      {props.children}
                    </div>
                  </div>
                </div>
            </div>
        </div>
    )
}

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      false ? (
        <Spinner />
      ) : isAuthenticated ? (
          <PrivateLayout >
            <Component {...props} />
          </PrivateLayout>
      ) : (
        store.dispatch(setAlert("You must be logged in to enter district data","danger",4000)),
        <Redirect to="/login" />
      )
    }
  />
);


PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event
});

export default connect(mapStateToProps)(PrivateRoute);