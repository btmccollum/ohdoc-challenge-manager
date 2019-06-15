import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { linkGithubAccount, linkTwitterAccount } from '../actions/userActions'

class RepoDisplay extends React.Component {
    // handle logic for OAuth links to be displayed for user
    accountStatusBox = () => {
        const user = this.props.user.currentUser.attributes

        if ( user ) {
            if (user.github_linked == true && user.twitter_linked == true) {
                return (
                    <> 
                    <p>GitHub Account is Linked.</p>
                    
                    <p>Twitter Account is Linked.</p> 
                    </>
                )
            } else if (user.github_linked == true && user.twitter_linked == false) {
                return (
                    <> 
                    <p>GitHub Account is Linked.</p>
                    
                    <p>
                        <Button onClick={() => this.props.linkTwitterAccount()}>
                            Link Twitter Account
                        </Button>
                    </p>
                    </>
                )
            } else if (user.github_linked == false && user.twitter_linked == true) {
                return( 
                    <>
                    <Button onClick={() => this.props.linkGithubAccount()}>
                            Link GitHub Account
                    </Button>
                    
                    <p>Twitter Account is Linked.</p> 
                    </>
                )
            } else {
                return (
                    <>
                    <p>
                        <Button onClick={() => this.props.linkGithubAccount()}>
                            Link GitHub Account
                        </Button>
                    </p>
                    <p>
                        <Button onClick={() => this.props.linkTwitterAccount()}>
                            Link Twitter Account
                        </Button>
                    </p>
                    </>
                )
            }
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
  linkGithubAccount,
  linkTwitterAccount
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RepoDisplay);