import React from 'react'



require('../Style/Modal.scss')

class Modal extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.defaultState = {
            isOpen: false
        }
    }

    isOpen() {
        return this.props.open ? "open" : ""
    }

    stopPropagation(e) {
        e.stopPropagation()
    }

    render() {
        return (
            <div id="Modal" className={this.isOpen() + " modal"} onClick={this.props.onClose}>
                <div className="modal-dialog" onClick={this.stopPropagation}>
                    <div className="modal-header">
                        {this.props.title}
                    </div>
                    <div className="modal-body">
                        <form>
                            {this.props.name}
                            {this.props.list}
                        </form>
                    </div>
                    <div className="modal-footer">
                        {this.props.button}
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal