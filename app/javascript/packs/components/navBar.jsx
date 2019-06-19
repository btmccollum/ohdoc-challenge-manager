import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class NavigationBar extends React.Component {
    renderOptions = () => {
        status = this.props.loggedIn
        
        if (status == 'true') {
            return (
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to="/profile" className="nav-link" role="button">
                                Profile
                            </NavLink>
                        
                            <NavLink to="/logout" className="nav-link" role="button">
                                Logout
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
            )
        } else {
            return (
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to="/login" className="nav-link" role="button">
                                Log In
                            </NavLink>

                            <NavLink to="/signup" className="nav-link" role="button">
                                Sign Up
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
            )
        }
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" className="topNav">
                <NavLink to="/" className="navbar-brand"> 
                    ohdoc!
                </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                {this.renderOptions()}
            </Navbar>
        )
    }
}

export default NavigationBar