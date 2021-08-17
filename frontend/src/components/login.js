import React, { Component,useContext } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";
import Axios from 'axios';
import AppNavbar from './AppNavbar';

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        userType: 'customer',
        loginError: false,
        isLogin: false,
        first :false
    };
    // constructor (props){
    //     super(props);
    //     this.state = {
    //         username: '',
    //         password: '',
    //         userType: 'customer',
    //         loginError: false,
    //         isLogin: false
    //     };
    //     this.onSubmit=this.onSubmit.bind(this);
    onSubmit=(e)=>{
        e.preventDefault();
        if (this.state.username === '' || this.state.password === ''){
            alert('Fields cannot be empty');
        }
        else {
            console.log(this.state);
            const user = {
                username: this.state.username,
                password: this.state.password
            }
            if(this.state.userType=== 'customer'){
                console.log("custom")
                Axios.post('http://localhost:4000/api/customer/auth',user)
                .then(res=>{
                    console.log(res.data)
                    if(res.data===false)
                    {
                        console.log('hi');
                        this.setState({loginError: true});
                        
                    }
                    else{
                        const user={
                            username: res.data[0].username,
                            id: res.data[0]._id,
                            type: 'customer'
                        }
                        window.sessionStorage.setItem("user",JSON.stringify(user))
                        console.log(JSON.parse(window.sessionStorage.getItem("user")));
                        this.setState({loginError: false});
                        this.setState({isLogin:true});
                        // window.location.reload(false);
                    }
                })
                .catch(err=>console.log(err))
            }
            else if(this.state.userType=== 'vendor'){
                console.log("vend") 
                Axios.post('http://localhost:4000/api/vendor/auth',user)
                .then(res=>{
                    console.log(res.data);
                    if(res.data===false)
                    {
                        console.log('hi');
                        this.setState({loginError: true});
                    }
                    else{
                        const user={
                            username: res.data[0].username,
                            id: res.data[0]._id,
                            type: 'vendor'
                        }
                        window.sessionStorage.setItem("user",JSON.stringify(user))
                        console.log(JSON.parse(window.sessionStorage.getItem("user")));
                        this.setState({loginError: false});
                        this.setState({isLogin:true});
                    }
                })
                .catch(err=>console.log(err))
            }
            
            this.setState({
                username: '',
                password: '',
                // userType: 'customer'
            })
        }
        
    }

    onChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    onChangeUsername = (event) => {
        this.setState({ username: event.target.value });
    }
    onChangeUser = (event) => {
        this.setState({ userType: event.target.value });
    }
    render() {
        return (
            <React.Fragment>
                <AppNavbar/>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label key='username' >Username</label>
                        <input
                            type='text'
                            name='username'
                            id='username'
                            placeholder='Username'
                            value={this.state.username}
                            className='form-control'
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className='form-group'>
                        <label key='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Password'
                            value={this.state.password}
                            className='form-control'
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className='from-group'>
                        <label key='userType'>Type</label>
                        <select id='users' className='form-control' onChange={this.onChangeUser}>
                            <option selected value="customer" >Customer</option>
                            <option value="vendor">Vendor</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <input
                            type='submit' value="Login" className="btn btn-primary" style={{ marginTop: '1rem' }}
                        />
                    </div>
                </form>
                {this.state.loginError?<p style={{color:'red'}}>no such user found</p>:null}
                {this.state.isLogin?JSON.parse(window.sessionStorage.getItem("user")).type=='customer'?<Redirect to='/customer'/>:<Redirect to='/vendor'/>:null}
                New User? <Link to='/create'>click here </Link>
            </React.Fragment>
        
        );
    }
}


