import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class NavigationBar extends React.Component {
    renderOptions = () => {
        status = this.props.loggedIn
        
        if (status == 'true') {
            return (
                <Nav>
                    <NavLink to="/profile" className="nav-link" role="button">
                        Profile
                    </NavLink>
                
                    <NavLink to="/logout" className="nav-link" role="button">
                        Logout
                    </NavLink>
                </Nav>
            )
        } else {
            return (
                <Nav>
                    <NavLink to="/login" className="nav-link" role="button">
                        Log In
                    </NavLink>

                    <NavLink to="/signup" className="nav-link" role="button">
                        Sign Up
                    </NavLink>
                </Nav>
            )
        }
    }

    render() {
        return (
            <Navbar collapseOnSelect fixed="top" expand="sm" className="topNav">
                <NavLink to="/" className="navbar-brand"> 
                    ohdoc!
                </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    {this.renderOptions()}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavigationBar