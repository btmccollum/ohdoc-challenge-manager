import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { linkGithubAccount } from '../actions/userActions'

class RepoDisplay extends React.Component {

    accountStatusBox = () => {
        if (this.props.user.github_linked == "true") {
            return ( <span>GitHub Account is Linked.</span> )
        } else {
            return (
                <Button onClick={() => this.props.linkGithubAccount()}>
                    Link GitHub Account
                </Button>
            )
        }
    }

    // FOR TESTING PURPOSES ONLY
    showGithub = () => {
        console.log(this.state.user)
    }
    
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        {this.accountStatusBox()}
                        <Button onClick={() => {
                            console.log(this.props.user)
                            console.log(sessionStorage.getItem('jwt'))
                            console.log(sessionStorage.getItem('logged_in'))
                            }}>Show Github Info</Button>
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
  linkGithubAccount
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RepoDisplay);