import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { sendPasswordReset } from '../actions/userActions'

class ForgotPassword extends React.Component {
    state = {
        email: '',
    }

    handleOnChange = event => {
        const field = event.target.name
        let state = this.state
    
        state[field] = event.target.value
        this.setState(state)
    }
    
    handleOnSubmit = event => {
        event.preventDefault()

        if (this.state.email !== '') {
            const user = this.state
            this.props.sendPasswordReset(user, () => this.props.history.push('/'))
        } else {
            this.props.clearErrors()
            this.props.addError("Email cannot be blank.")
        }
    }

    handleErrors = () => {
        if (this.props.errors.length > 0) { 
          setTimeout(this.props.clearErrors, 10000)
          return (
            this.props.errors.map(error => <li key={cuid()}>{error}</li>)
          )
        }
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center frontPageRow">
                    <Col md={{ span: 8 }}>
                        <Form onSubmit={this.handleOnSubmit} className="forgot-password">
                            <h1>ohdoc!</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);