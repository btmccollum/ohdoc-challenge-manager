import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { updateUser } from '../actions/userActions';
import { addError, clearErrors } from '../actions/errorActions';

class PasswordReset extends React.Component {
    state = {
        password: '',
        password_confirmation: '',
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
        const { password, password_confirmation } = this.state;
        
        return (
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={this.onSubmit} className="password-reset">
                            <h1>Reset Your Password:</h1>
                            <ul>{this.handleErrors()}</ul>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>New Password</Form.Label>
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
        user: state.user,
        errors: state.errors,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    updateUser,
    addError,
    clearErrors,
}, dispatch)

export default connect(mapStateToProps, null)(PasswordReset);