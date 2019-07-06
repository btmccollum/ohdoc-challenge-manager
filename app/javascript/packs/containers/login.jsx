import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { loginUser } from '../actions/userActions';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { addError, clearErrors } from '../actions/errorActions';
import cuid from 'cuid';

class Login extends Component {
    state = {
      email: '',
      password: ''
    }
    
  handleOnChange = event => {
    const field = event.target.name
    let state = this.state

    state[field] = event.target.value
    this.setState(state)
  }

  onSubmit = event => {
    event.preventDefault()

    if (this.state.email !== '' && this.state.password !== '') {
      const user = this.state
      this.props.loginUser(user, () => this.props.history.push('/'))
    } else {
      this.props.clearErrors()
      this.props.addError("All fields are required.")
    }
  }

  handleErrors = () => {
    if (this.props.errors.length > 0) { 
      setTimeout(this.props.clearErrors, 5000)
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
    const { email, password } = this.state

    return (
      <Container className="loginContainer">
        <Row className="justify-content-md-center frontPageRow">
          <Col md={{ span: 6 }} className="login-box">
            <Form onSubmit={this.onSubmit} className="login">
            <h1>ohdoc!</h1>
            <ul>{this.handleErrors()}</ul>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={this.handleOnChange} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={this.handleOnChange} />
                <Form.Text className="text-muted">
                  <Link to="/password/forgot">Forgot password?</Link>
                </Form.Text>
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

const mapDispatchToProps = dispatch => bindActionCreators({
  loginUser,
  clearErrors,
  addError
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));