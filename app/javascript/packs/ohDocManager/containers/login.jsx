import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { loginUser } from '../actions/userActions';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { clearErrors } from '../actions/errorActions';
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

    const user = this.state
    this.props.loginUser(user, () => this.props.history.push('/'))
  }

  handleErrors = () => {
    if (this.props.errors) { 
      return (
        this.props.errors.map(error => <li key={cuid()}>{error}</li>)
      )
    }
  }

  componentWillUnmount() {
    if (this.props.errors.length > 0) {
      clearErrors()
    }
  }

  render() {
    const { email, password } = this.state

    return (
      <React.Fragment>
        <Container className="h-100">
          <Row className="d-flex justify-content-center w-100 h-100 align-items-center">
            <Col md={{ span: 8 }}>
              <Form onSubmit={this.onSubmit} className="login">
              <h1>OHDOC CM Login</h1>
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
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
              <br/>
              <p><Link to='/signup'>Sign Up</Link></p>
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
    errors: state.errors
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loginUser,
  clearErrors
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));