import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import RepoDisplay from './repoDisplay'
import { updateUser, deleteUser } from '../actions/userActions'

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            filePath: "",
        }

        this.handleOnChange = this.handleOnChange.bind(this)
    }

    handleOnChange = event => {
        this.setState({
            filePath: event.target.value
        }, console.log(this.state))
    }

    handleOnClick = event => {
        event.preventDefault()
    }

    handleOnSubmit = event => {
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

    handleGitUrlDisplay = () => {
        let user = this.props.user.currentUser.attributes
        if (user) {
            if (user.github_repo_url !== null) {
                return (
                    <Form.Control onChange={this.handleOnChange} value={this.state.filePath} name="filePath" placeholder={user.github_repo_url} />
                )
            } else {
                return (
                    <Form.Control plaintext readOnly defaultValue="No GitHub Account Linked." />
                )
            }
        }
    }

    deleteUserAccount = () => {
        this.props.deleteUser(this.props.user.currentUser.id, () => this.props.history.push('/'))
    }

    render() {
        const user = this.props.user.currentUser.attributes

        return (
            <Container className="profileContainer">
                <Row className="justify-content-md-center w-100 contentRow">
                    <Col md={{ span: 7 }} className="profileBox align-self-center">
                        <h1 className="profileHeader">ohdoc!</h1>
                        <h2>Account Settings:</h2>
                        <Form onSubmit={this.handleOnSubmit} className="profileForm">
                            <Form.Row>
                                <Form.Group controlId="formPlaintextEmail">
                                    <Form.Label className="boldTitle">
                                        Email:
                                    </Form.Label>
                                    
                                    <Form.Control plaintext readOnly defaultValue={user ? user.email : "Not Available."} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label className="boldTitle">
                                        GitHub Repo Url:
                                    </Form.Label>
                                    
                                    {this.handleGitUrlDisplay()}

                                    <p className="repoWarning">*IMPORTANT: This program will ONLY work with a fork of the 100-days-of-code repo!</p>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Button variant="primary" type="submit" className="submitFormButton">Save</Button>
                            </Form.Row>
                        </Form>

                        <Row className="profileRow">
                            <Col>
                                <span className="profileSection">Authorized Applications:</span>
                                <RepoDisplay />
                            </Col>
                        </Row>

                        <Row className="profileRow">
                            <Col>
                                <span className="profileSection">Account Actions:</span>
                                <p>
                                    <Button variant="danger" onClick={() => this.deleteUserAccount()}>Delete Account</Button> Warning! This action cannot be undone.
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    updateUser,
    deleteUser,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)