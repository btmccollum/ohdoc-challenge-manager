import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Col, Button } from 'react-bootstrap'
import RepoDisplay from './repoDisplay'

class Profile extends React.Component {
    handleOnClick = event => {
        event.preventDefault()
    }

    render() {
        const user = this.props.user.currentUser.attributes

        return (
            <Container className="d-flex">
                <Row className="justify-content-md-center w-100">
                    <Col md={8} className="profileBox align-self-center">
                        <h1 className="profileHeader">ohdoc!</h1>
                        <h2>Account Settings:</h2>
                        <Row className="profileRow">
                            <Col>
                            <span className="profileSection">Email:</span> {user ? user.email : "Not Available."}
                            </Col>
                        </Row>
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