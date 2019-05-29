import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { createSubmission } from '../../actions/submissionActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addError, clearErrors } from '../../actions/errorActions';
import cuid from 'cuid';


class TweetForm extends React.Component {
    state = {
        tweet: "",
        entryTitle: "",
    }

    handleOnChange = event => {
        const field = event.target.name
        let state = this.state
    
        state[field] = event.target.value
        this.setState(state)
    }
    
    handleOnSubmit = event => {
        event.preventDefault()
        const tweetLength = this.state.tweet.length

        if (tweetLength > 140) {
            this.props.addError("Tweet cannot exceed 140 characters.")
        } else {
            this.props.createSubmission(this.state, "twitter")
            this.setState({
                tweet: "",
                entryTitle: "",
            })
            this.props.clearErrors()
        }
    }

    handleDisplayName = () => {
        const user = this.props.user.currentUser
    
        if (Object.keys(user).length !== 0) {
            return `@${user.attributes.twitter_username} - Account Linked`
        } else {
            return "No Account Linked."
        }
    }

    displayRemainingCharacters = () => {
        return (140 - this.state.tweet.length)
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
            this.props.clearErrors()
        }
    }

    render() {
        const tweet = this.state.tweet
        const user = this.props.user.currentUser.attributes

        return (
            <Container>
                <Row>
                    <Col md={6}>
                        <h1>Send your Tweet</h1>

                        <h4>{this.handleDisplayName()}</h4>
                        <Form onSubmit={this.handleOnSubmit}>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" name="tweet" value={tweet} onChange={this.handleOnChange} rows="3" />
                                <Form.Label>{this.displayRemainingCharacters()} characters remaining.</Form.Label>
                            </Form.Group>

                            <ul>{this.handleErrors()}</ul>
                            <Button variant="secondary" type="submit">
                                Submit
                            </Button>
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
        errors: state.errors.errors, 
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    createSubmission,
    addError,
    clearErrors,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TweetForm)