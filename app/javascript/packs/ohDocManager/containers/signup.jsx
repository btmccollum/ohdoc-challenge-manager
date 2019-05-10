import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../actions/userActions';
import { withRouter, Link } from 'react-router-dom';
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
      this.props.signupUser(user, () => this.props.history.push('/link_account'))
    }

    handleErrors = () => {
      // loading form errors from rails API if present
      if (this.props.errors) { 
        return (
          this.props.errors.map(error => <li key={cuid()}>{error}</li>)
        )
      }
    }

    componentWillUnmount() {
      // clearing subreddits when unmounted so a fresh list is populated when revisted
      if (this.props.errors.length > 0) {
        clearErrors()
      }
    }
  
    render() {
      const { email, password, password_confirmation } = this.state;
      // const { errors } = this.props;
      
      // rendering a signup form for user display
      return (
        <React.Fragment>
          <Container className="h-100">
            <Row className="d-flex justify-content-center w-100 h-100 align-items-center">
              <Col md={{ span: 8 }}>
                <Form onSubmit={this.handleOnSubmit} className="signup">
                <h1>Get started with OHDOC CM</h1>
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

                  <p><Link to='/login'>Log In</Link></p>
                </Form>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      )
    }
}
  
const mapStateToProps = state => {
  return {
    errors: state.errors.errors
  }
}

export default withRouter(connect(mapStateToProps, { signupUser })(Signup));