import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { createSubmission } from '../../actions/submissionActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addError, clearErrors } from '../../actions/errorActions';
import cuid from 'cuid';
import { linkTwitterAccount } from '../../actions/userActions'
import SubmittedModal from '../../containers/submittedModal'


class TweetForm extends React.Component {
    state = {
        tweet: "",
        entryTitle: "",
    }

    // modals used to display successful submission display from SubmittedModal
    showModal = () => {
        this.setState({ show: true });
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    handleOnClick = event => {
        event.preventDefault()

        this.props.linkTwitterAccount()
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

        if (tweetLength > 280) {
            this.props.addError("Tweet cannot exceed 280 characters.")
        } else {
            this.props.createSubmission(this.state, "twitter")
            // submittedModal is displayed after a tweet is submitted successfully 
            this.showModal()

            // clear out local state and errors
            this.setState({
                tweet: "",
                entryTitle: "",
            })
            this.props.clearErrors()
        }
    }

    handleDisplayName = () => {
        const user = this.props.user.currentUser
    
        if (Object.keys(user).length != 0 && user.attributes.twitter_username != null) {
            const twitter_url = `https://twitter.com/${user.attributes.twitter_username}`
            
            return (
                <p>Twitter Account: <a href={twitter_url} target="_blank">@{user.attributes.twitter_username}</a> - Account Linked</p>
            )
        } else {
            return "No Account Linked."
        }
    }

    displayRemainingCharacters = () => {
        return (280 - this.state.tweet.length)
    }

    displayTweetForm = () => {
        const tweet = this.state.tweet
        const user = this.props.user.currentUser.attributes
        
        if (user) {
            if (user.twitter_linked) {
                return (
                    <Form onSubmit={this.handleOnSubmit}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" name="tweet" value={tweet} onChange={this.handleOnChange} rows="3" />
                            <Form.Label>{this.displayRemainingCharacters()} characters remaining.</Form.Label>
                        </Form.Group>

                        {/* <ul>{this.handleErrors()}</ul> */}
                        <Button variant="secondary" type="submit">
                            Submit
                        </Button>
                    </Form>
                )
            } else {
                return (
                    <p>
                        You must link your Twitter account to use this feature. Click <a href="#" onClick={this.handleOnClick}>here</a> to start! 
                    </p>
                )
            }
        }
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
            <Container className="tweetContainer">
                <Row className="justify-content-md-center">
                    <Col md={{ span: 8 }} className="tweetBox">
                        <h1>Send your Tweet</h1>

                        { this.handleDisplayName() }
                            
                        { this.displayTweetForm() }
                    </Col>
                </Row>

                <SubmittedModal show={this.state.show} onHide={this.hideModal} content="Tweet" />
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
    linkTwitterAccount,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TweetForm)