import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { linkGithubAccount } from '../actions/userActions'

class RepoDisplay extends React.Component {

    accountStatusBox = () => {
        if (this.props.user.github === true) {
            return ( <span>GitHub Account is Linked.</span> )
        } else {
            return (
                <Button onClick={() => this.props.linkGithubAccount()}>
                    Link GitHub Account
                </Button>
            )
        }
    }
    
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        {this.accountStatusBox()}
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