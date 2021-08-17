import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './login'
export default class Logout extends Component {
    render() {
        window.sessionStorage.removeItem("user");
        return (
            <Redirect to='/login' />
            // {window.location.reload(false);}
        );
    }
}