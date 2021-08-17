import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }
    // componentDidUpdate(){
        // console.log('olaola')
    // }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand >Bulk Ordering App</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    {window.sessionStorage.getItem("user") == null ?
                                        (<NavLink href="/login">
                                            Login
                                        </NavLink>) :
                                        (<NavLink href="/logout">
                                            Logout
                                        </NavLink>)
                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>

        );
    }
}

export default AppNavbar;