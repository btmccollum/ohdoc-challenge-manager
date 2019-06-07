import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Col, Form } from 'react-bootstrap'
import RepoDisplay from './repoDisplay'

class Profile extends React.Component {
    handleOnClick = event => {
        event.preventDefault()
    }

    render() {
        const user = this.props.user.currentUser.attributes

        return (
            <Container className="profileContainer">
                <Row className="justify-content-md-center w-100">
                    <Col md={{ span: 6 }} className="profileBox align-self-center">
                        <h1 className="profileHeader">ohdoc!</h1>
                        <h2>Account Settings:</h2>
                        <Form>
                            <Form.Row>
                                <Form.Group controlId="formPlaintextEmail">
                                    <Form.Label>
                                        Email:
                                    </Form.Label>
                                    
                                    <Form.Control plaintext readOnly defaultValue={user ? user.email : "Not Available."} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>
                                        GitHub Repo Url:
                                    </Form.Label>
                                    
                                    <Form.Control defaultValue={user ? user.github_repo_url : "Not Available."} />
                                </Form.Group>
                            </Form.Row>
                        </Form>


                        {/* <Row className="profileRow">
                            <Col>
                                <span className="profileSection">Email:</span> {user ? user.email : "Not Available."}
                            </Col>
                        </Row> */}
                        
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
                                    Delete Account - Click <a href="#" onClick={this.handleOnClick}>here</a> to delete your account. This cannot be undone.
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
    // linkGithubAccount,
    // linkTwitterAccount
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)