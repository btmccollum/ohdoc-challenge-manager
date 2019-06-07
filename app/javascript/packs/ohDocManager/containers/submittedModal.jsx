import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, Container, Row, Col, Button } from 'react-bootstrap'

class SubmittedModal extends React.Component {
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
                    <p className="boldTitle">{this.props.content} successfully posted!</p>
                </Modal.Title>
                </Modal.Header>
                {/* <Modal.Body>
                    <p>Check it out here: link to go here</p>
                </Modal.Body> */}
            </Modal>
        )
    }
}

export default connect(null, null)(SubmittedModal)