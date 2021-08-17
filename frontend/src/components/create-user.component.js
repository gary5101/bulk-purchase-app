import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import axios from 'axios';
import AppNavbar from './AppNavbar'
export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            type: 'customer',
            userExists:false,
            isLogin:false
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    onChangeType=(event)=> {
        this.setState({ type: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password
        }
        if (this.state.type == 'customer') {
            axios.post('http://localhost:4000/api/customer', newUser)
                .then(res => {
                    console.log('fds');
                    if (res.data == false) {
                        this.setState({userExists:true})
                    }
                    else {
                        const user = {
                            username: res.data[0].username,
                            id: res.data[0]._id,
                            type: 'customer'
                        }
                        window.sessionStorage.setItem("user", JSON.stringify(user))
                        this.setState({isLogin:true})
                    }
                })
                .catch(err => console.log(err));
        }
        else {
            axios.post('http://localhost:4000/api/vendor', newUser)
            .then(res => {
                if (res.data == false) {
                    this.setState({userExists:true})
                }
                else {
                    const user = {
                        username: res.data[0].username,
                        id: res.data[0]._id,
                        type: 'vendor'
                    }
                    window.sessionStorage.setItem("user", JSON.stringify(user))
                    this.setState({isLogin:true})
                }
            })
            .catch(err => console.log(err));
        }
        this.setState({
            username: '',
            password: ''
        });

    }
    render() {
        return (
            <div>
                <AppNavbar />
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className='from-group'>
                        <label key='userType'>Type</label>
                        <select id='users' className='form-control' onChange={this.onChangeType}>
                            <option value="customer" >Customer</option>
                            <option value="vendor">Vendor</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary" style={{ marginTop: '1rem' }} />
                    </div>
                </form>
                {this.state.userExists?<p style={{color:'red'}}>user already exists</p>:null}
                {this.state.isLogin?JSON.parse(window.sessionStorage.getItem("user")).type=='customer'?<Redirect to='/customer'/>:<Redirect to='/vendor'/>:null}
            </div>
        )
    }
}