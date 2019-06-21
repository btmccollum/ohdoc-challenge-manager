import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return(
        <Container className="nopageContainer">
            <Row className="justify-content-center align-items-center nopageRow">
                <Col md={{ span: 8 }} className="nopageCol">
                    <h1>404! Page Not Found.</h1>
                    <p className="nopageButton"><NavLink to="/" role="button" className="no-page-found-return">Click here to go back.</NavLink></p>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound