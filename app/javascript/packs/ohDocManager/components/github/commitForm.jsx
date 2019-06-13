import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { createSubmission } from '../../actions/submissionActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addError, clearErrors } from '../../actions/errorActions';
import cuid from 'cuid';
import { linkGithubAccount, updateUser } from '../../actions/userActions'
import SubmittedModal from '../../containers/submittedModal'

class CommitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            repoName: "",
            filePath: "",
            entryTitle: "",
            progress: "",
            thoughts: "",
            link: "",
        }
    
        // This binding is necessary to make `this` work in the callback
        this.handleNextButton = this.handleNextButton.bind(this);
    }
    
    handleOnClick = event => {
        event.preventDefault()

        this.props.linkGithubAccount()
    }
    
    handleOnChange = event => {
        const field = event.target.name
        let state = this.state
    
        state[field] = event.target.value
        this.setState(state)
    }

    handleNextButton = event => {
        event.preventDefault()

        const userId = this.props.user.currentUser.id
        const repoUrl = this.state.filePath
        // creating file path to persist, must match the api format which differs from the standard url path
        const repoFilePath = repoUrl.replace(/.*(?=100-days-of-code)/g, "").replace("blob/master","contents")

        const data = {
            github_repo_url: repoUrl,
            github_repo_path: repoFilePath,
            id: userId,
        }

        this.props.updateUser(data)
    }
    
    handleOnSubmit = event => {
        event.preventDefault()

        this.props.createSubmission(this.state, "github")
        this.showModal()
        this.setState({
                repoName: "",
                filePath: "",
                entryTitle: "",
                progress: "",
                thoughts: "",
                link: "",
            })
    }

    showModal = () => {
        this.setState({ show: true });
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    handleDisplayName = () => {
        const user = this.props.user.currentUser

        if (!user) return
    
        if (user.attributes && user.attributes.github_username != null) {
            if (user.attributes.github_repo_url != null) {
                return (
                    <ul>
                        <li><span className="boldTitle"> </span>GitHub Repo: <a href={user.attributes.github_repo_url} target="_blank">{user.attributes.github_repo_url}</a></li>
                        <li><span className="boldTitle"></span>GitHub Account: {user.attributes.github_username} - Linked</li>
                    </ul>
                )
            } else {
                return (
                    <p><span className="boldTitle">{user.attributes.github_username}</span> - Account Linked</p>
                )
            }
        } else {
            return "No Account Linked."
        }
    }

    displayCommitForm = () => {
        const { repoName, filePath, entryTitle, progress, thoughts, link } = this.state
        const user = this.props.user.currentUser.attributes
        
        if (user) {
            if (user.github_linked && user.github_repo_url == null) {
                return (
                    <Container>
                        <Row>
                            <p>Please paste the full url to your repo's log file to begin.</p> 
                            <p>This can be changed in your profile at a later point.</p>
                        </Row>
                        <Row>
                            <Form onSubmit={this.handleNextButton}>
                                <Form.Row>
                                    <Form.Label>Log File Path:</Form.Label>
                                    <Form.Control placeholder="https://github.com/username/100-days-of-code/blob/master/log.md" name="filePath" value={filePath} onChange={this.handleOnChange} />
                                </Form.Row>

                                <Form.Row>
                                    <Button variant="secondary" type="submit" className="submitFormButton">
                                        Next
                                    </Button>
                                </Form.Row>
                            </Form>
                        </Row>
                    </Container>
                )
            } else if (user.github_linked) {
                return (
                    <Form onSubmit={this.handleOnSubmit}>
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
                                <Button variant="secondary" type="submit" className="submitFormButton">
                                    Submit
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                )
            } else {
                return (
                    <p>
                        You must link your GitHub account to use this feature. Click <a href="#" onClick={this.handleOnClick}>here</a> to start! 
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
        const { repoName, filePath, entryTitle, progress, thoughts, link } = this.state

        return (
            <Container className="gitContainer">
                <Row className="justify-content-md-center">
                    <Col md={{ span: 8 }} className="gitBox">
                        <h1>Add Your GitHub Entry</h1>

                        { this.handleDisplayName() }
                        
                        { this.displayCommitForm() }
                    </Col>
                </Row>

                <SubmittedModal show={this.state.show} onHide={this.hideModal} content="GitHub commit" />
            </Container>         
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        errors: state.errors.errors
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    createSubmission,
    addError,
    clearErrors,
    linkGithubAccount,
    updateUser,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CommitForm)