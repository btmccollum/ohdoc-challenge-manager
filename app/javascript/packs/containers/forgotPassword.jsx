import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { sendPasswordReset } from '../actions/userActions';
import { addError, clearErrors } from '../actions/errorActions';
import { withRouter } from 'react-router-dom';
import cuid from 'cuid';

class ForgotPassword extends React.Component {
    state = {
        email: '',
    }

    handleOnChange = event => {
        const field = event.target.name;
        let state = this.state;
    
        state[field] = event.target.value;
        this.setState(state);
    }
    
    handleOnSubmit = event => {
        event.preventDefault();

        if (this.state.email !== '') {
            const user_email = this.state.email;
            this.props.sendPasswordReset(user_email, () => this.props.history.push('/'));
        } else {
            this.props.clearErrors();
            this.props.addError("Email cannot be blank.");
        }
    }

    handleErrors = () => {
        if (this.props.errors.length > 0) { 
          setTimeout(this.props.clearErrors, 10000);
          return (
            this.props.errors.map(error => <li key={cuid()}>{error}</li>)
          )
        }
    }

    render() {
        const email = this.state.email;
        
        return (
            <Container>
                <Row className="justify-content-md-center frontPageRow">
                    <Col md={{ span: 8 }}>
                        <Form onSubmit={this.handleOnSubmit} className="forgot-password">
                            <h1>Forgot Password</h1>
                            <p>Enter your e-mail and we'll send out instructions on how to reset your password. Please be aware that the link will expire after one hour. If you do not receive an email in the next few minutes, please check your spam folder before trying again.</p>
                            <ul>{this.handleErrors()}</ul>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={this.handleOnChange} />
                            </Form.Group>

                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
  
}

const mapStateToProps = state => {
    return {
      errors: state.errors.errors
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ sendPasswordReset,
                                                            addError,
                                                            clearErrors, 
                                                          }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));