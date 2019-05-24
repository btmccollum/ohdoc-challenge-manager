import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { createSubmission } from '../../actions/submissionActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

        this.props.createSubmission(this.state, "github")
        this.setState({
                repoName: "",
                filePath: "",
                entryTitle: "",
                progress: "",
                thoughts: "",
                link: "",
            })
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
            </Container>         
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    createSubmission
  }, dispatch)

export default connect(null, mapDispatchToProps)(CommitForm)