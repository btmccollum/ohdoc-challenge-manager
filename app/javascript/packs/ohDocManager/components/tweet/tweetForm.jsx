import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class TweetForm extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col md={6}>
                        <h1>Send your Tweet</h1>

                        <h4>@btmccollum</h4>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Tweet (140 Character Limit)</Form.Label>
                                <Form.Control as="textarea" rows="3" />
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

export default TweetForm