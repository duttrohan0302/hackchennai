import React from 'react'
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Alert from '../Components/Alert'
import NavBar from '../Components/NavBar';


const DefaultLayout = ({children}) => {
    return (
        <div id="wrapper">
            <div className="container-fluid p-0 min-vh-100">
                <NavBar/>
                <Alert />
                <div id="page-wrapper">
                    {children}
                </div>
            </div>
        </div>
    )
}


const DefaultLayoutRoute = ({component: Component, ...rest}) => ( 

      <Route {...rest} render={matchProps => (  
        <DefaultLayout>
            <Component {...matchProps} />  
        </DefaultLayout>
      )} />  

)

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
};

export default DefaultLayoutRoute;

