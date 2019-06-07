import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

class GettingStartedModal extends React.Component {
    render() {
        return (
            <Modal
                // receive show and hide props from parent container
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <p className="boldTitle">Welcome to the OHDOC Challenge Manager!</p>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This tool was designed to help you save precious minutes. By linking your GitHub and Twitter accounts, you can easily do your daily updates from the same page without having to jump through any extra hoops.</p> 
                    <p>I hope you'll find as much use for this tool as I did. Goodluck with the challenge!</p>
                    <span className="boldTitle">Requirements:</span>
                    <ul>
                        <li>A <a href="https://www.github.com">GitHub</a> account</li>
                        <li>A fork of the <a href="https://github.com/kallaway/100-days-of-code">100 Days of Code</a> repo</li>
                        <li>A <a href="https://www.twitter.com">Twitter</a> account</li>
                    </ul>
                </Modal.Body>
            </Modal>
        )
    }
}

export default connect(null, null)(GettingStartedModal)