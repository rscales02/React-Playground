import React from 'react'

require('../Style/Modal.scss')

class Modal extends React.Component {

    isOpen() {
        return this.props.open ? "open" : ""
    }


    render() {
        return (
            <div id="recipeModal" className={this.isOpen() + " modal"} role="dialog" >
                <div className="modal-dialog">
                    <div id="newRecipe" className="modal-content" >
                        <div className="modal-header">
                            <h3>Add New Recipe</h3>
                        </div>
                        <div className="modal-body">
                            <form>
                                <p>
                                    <label htmlFor='name'>Name:</label>
                                    <input id='name' />
                                </p>
                                <p>
                                    <label htmlFor='ingredients'>Ingredients:</label>
                                    <textarea id='ingredients' />
                                </p>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" data-dismiss="modal" onClick={this.props.onClick}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal