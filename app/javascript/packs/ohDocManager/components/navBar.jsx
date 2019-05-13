import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class NavigationBar extends React.Component {
    

    renderOptions = () => {
        status = this.props.loggedIn
        
        if (status == 'true') {
            return (
                
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to="/submissions">Submissions</NavLink>
                        </Nav>

                        <Nav>
                            <NavLink to="/logout">
                                Logout
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
            )
        } else {
            return (
                
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <NavLink to="/login">
                                Log In
                            </NavLink>

                            <NavLink to="/signup">
                                Sign Up
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
            )
        }
    }

    render() {
        return (
            <Container fluid>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">ohdoc!</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    {this.renderOptions()}
                    
                </Navbar>
            </Container>
        )
    }
}

export default NavigationBar