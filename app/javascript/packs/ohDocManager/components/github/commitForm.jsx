import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class CommitForm extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col md={8}>
                    <h1>Add Your GitHub Entry</h1>
                    <p>
                        <span>Repo: Brad's 100DoC Log</span><br />
                        <span>File: 100-days-of-code/log.md</span>
                    </p>
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Log Entry Title</Form.Label>
                                    <Form.Control placeholder="Day #: Month, Day, Year" />
                                </Col>
                            </Form.Row>

                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Today's Progress</Form.Label>
                                        <Form.Control as="textarea" rows="3" />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Thoughts</Form.Label>
                                        <Form.Control as="textarea" rows="3" />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            
                            <Form.Row>
                                <Col>
                                    <Form.Label>Link(s) to Work</Form.Label>
                                    <Form.Control placeholder="Insert URL here" />
                                </Col>
                            </Form.Row>

                            <Form.Row>
                                <Col>
                                    <Button variant="secondary" type="submit">
                                        Submit
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </Container>         
        )
    }
}

export default CommitForm