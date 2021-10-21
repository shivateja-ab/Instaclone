import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import {isAuthenticated} from "../../utils/authOperations"; 

const PrivateRoute = ({component:Component, ...rest})=>(
    <Route
    //{...rest}
     render={props =>(
         isAuthenticated() ? (
         <Component {...props} />
         )
         :(<Redirect to={{pathname:'/register',state:{from:props.location}}} />)
     )}
     />
     )
export default PrivateRoute;