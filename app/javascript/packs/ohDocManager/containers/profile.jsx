import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Col, Button } from 'react-bootstrap'
import RepoDisplay from './repoDisplay'
import NavigationBar from '../components/navBar'

class Profile extends React.Component {
    handleOnClick = event => {
        event.preventDefault()
        console.log("hi!")
    }

    render() {
        const user = this.props.user.currentUser.attributes

        return (
            <>
            <Container>
                <Row>
                    <Col>
                    Email: {user ? user.email : "Not Available."}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span>Account Status:</span>
                        <RepoDisplay />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <span>Account Actions:</span>
                        <p>
                        Delete Account: Click <a href="#" onClick={this.handleOnClick}>here</a> to delete your account. This cannot be undone.
                        </p>
                    </Col>
                </Row>
            </Container>
            </>
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