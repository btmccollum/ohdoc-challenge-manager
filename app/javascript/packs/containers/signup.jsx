import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../actions/userActions';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { clearErrors } from '../actions/errorActions';
import cuid from 'cuid';

class Signup extends Component {
    state = {
        email: '',
        password: '',
        password_confirmation: ''
    }
  
    handleOnChange = event => {
      const field = event.target.name
      let state = this.state
  
      state[field] = event.target.value
      this.setState(state)
    }
  
    handleOnSubmit = event => {
      event.preventDefault()
      const user = this.state
      // action to create user account and callback to redirect to link account page
      this.props.signupUser(user, () => this.props.history.push('/'))
    }

    handleErrors = () => {
      if (this.props.errors.length > 0) { 
        setTimeout(this.props.clearErrors, 10000)
        return (
          this.props.errors.map(error => <li key={cuid()}>{error}</li>)
        )
      }
    }

    componentWillUnmount() {
      if (this.props.errors.length > 0) {
        this.props.clearErrors()
      }
    }
  
    render() {
      const { email, password, password_confirmation } = this.state;
      
      return (
        <Container className="signupContainer">
          <Row className="justify-content-md-center frontPageRow">
            <Col md={{ span: 6 }} className="signup-box">
              <Form onSubmit={this.handleOnSubmit} className="signup">
              <h1>ohdoc!</h1>
              <ul>{this.handleErrors()}</ul>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={this.handleOnChange.bind(this)} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={this.handleOnChange} />
                </Form.Group>

                <Form.Group controlId="formPasswordConfirmation">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password_confirmation" value={password_confirmation} onChange={this.handleOnChange} />
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

export default withRouter(connect(mapStateToProps, { signupUser, clearErrors })(Signup));