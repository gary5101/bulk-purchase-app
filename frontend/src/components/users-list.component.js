import React, { Component } from 'react';
import axios from 'axios';
import AppNavbar from './AppNavbar';

export default class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = { users: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/')
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((currentUser, i) => {
                                return (
                                    <tr>
                                        <td>{currentUser.username}</td>
                                        <td>{currentUser.email}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}