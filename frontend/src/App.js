import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import Login from './components/login'
import AppNavbar from './components/AppNavbar'
import Logout from './components/logout'
import Customer from './components/customer'
import Vendor from './components/vendor'

function App() {

  return (
    <Router>
      <div className="container">
        {/* <nav className="navbar navbar-expand-lg dark">
        <Link to="/" className="navbar-brand">App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link ">Users</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link ">Create User</Link>
          </li>
            <li className="navbar-item">
            <Link to="/login" className="nav-link ">Login</Link>
            </li>
            </ul>
            </div>
            </nav>
          <br /> */}
        {/* <AppNavbar /> */}
        <Route path="/customer" component={Customer}/>
        <Route path='/vendor' component={Vendor}/>
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={UsersList} />
        <Route path="/create" component={CreateUser} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
