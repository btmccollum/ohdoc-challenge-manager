import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { createSubmission } from '../../actions/submissionActions'

class CommitForm extends React.Component {
    state = {
        repoName: "",
        filePath: "",
        entryTitle: "",
        progress: "",
        thoughts: "",
        link: "",
    }
    
    handleOnChange = event => {
        const field = event.target.name
        let state = this.state
    
        state[field] = event.target.value
        this.setState(state)
    }
    
    handleOnSubmit = event => {
        event.preventDefault()

        createSubmission(this.state)
        // add logic to submit submission request to backend
    }

    render() {
        const { repoName, filePath, entryTitle, progress, thoughts, link } = this.state

        return (
            <Container>
                <Row>
                    <Col md={8}>
                        <h1>Add Your GitHub Entry</h1>
                        <Form onSubmit={this.handleOnSubmit}>
                            <Form.Row>
                                <Form.Label>Repo Name:</Form.Label>
                                <Form.Control placeholder="100-Days-of-Code" name="repoName" value={repoName} onChange={this.handleOnChange} />
                            </Form.Row>

                            <Form.Row>
                                <Form.Label>Log File Path:</Form.Label>
                                <Form.Control placeholder="100-days-of-code/log.md" name="filePath" value={filePath} onChange={this.handleOnChange} />
                            </Form.Row>

                            <Form.Row>
                                <Col>
                                    <Form.Label>Log Entry Title</Form.Label>
                                    <Form.Control placeholder="Day #: Month, Day, Year" name="entryTitle" value={entryTitle} onChange={this.handleOnChange} />
                                </Col>
                            </Form.Row>

                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Today's Progress</Form.Label>
                                        <Form.Control as="textarea" rows="3" name="progress" value={progress} onChange={this.handleOnChange} />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Thoughts</Form.Label>
                                        <Form.Control as="textarea" rows="3" name="thoughts" value={thoughts} onChange={this.handleOnChange} />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            
                            <Form.Row>
                                <Col>
                                    <Form.Label>Link(s) to Work</Form.Label>
                                    <Form.Control placeholder="Insert URL here" name="link" value={link} onChange={this.handleOnChange} />
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
                <Button onClick={() => console.log(this.state)}></Button>
            </Container>         
        )
    }
}

export default CommitForm