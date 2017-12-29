import React from 'react'
require('../Style/Modal.scss')

const Modal = ({ title, children, button, onClose }) => {
    return (
        <div id="Modal" className="open modal" onClick={onClose} >
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    {title}
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    {button}
                </div>
            </div>
        </div>
    )
}

export default Modal