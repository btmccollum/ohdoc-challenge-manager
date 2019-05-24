import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { createSubmission } from '../../actions/submissionActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class TweetForm extends React.Component {
    state = {
        tweet: ""
    }

    handleOnChange = event => {
        const field = event.target.name
        let state = this.state
    
        state[field] = event.target.value
        this.setState(state)
    }
    
    handleOnSubmit = event => {
        event.preventDefault()

        this.props.createSubmission(this.state, "twitter")
        this.setState({
                tweet: "",
            })
    }

    render() {
        const tweet = this.state.tweet

        return (
            <Container>
                <Row>
                    <Col md={6}>
                        <h1>Send your Tweet</h1>

                        <h4>@btmccollum</h4>
                        <Form onSubmit={this.handleOnSubmit}>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Tweet (140 Character Limit)</Form.Label>
                                <Form.Control as="textarea" name="tweet" value={tweet} onChange={this.handleOnChange} rows="3" />
                            </Form.Group>

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

const mapDispatchToProps = dispatch => bindActionCreators({
    createSubmission
  }, dispatch)

export default connect(null, mapDispatchToProps)(TweetForm)