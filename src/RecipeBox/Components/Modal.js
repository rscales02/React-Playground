import React from 'react'

require('../Style/Modal.scss')

class Modal extends React.Component {
    constructor(props) {
        super(props)

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleModalChange = this.handleModalChange.bind(this)

        this.state = this.defaultState = {
            name: "",
            ingredients: [],
            isOpen: false
        }
    }

    isOpen() {
        return this.props.open ? "open" : ""
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleModalChange(e) {
        let input = e.target.value
        input = input.split(" ")

        this.setState({
            ingredients: input
        })
        console.log(this.state.ingredients, this.state.name)
    }

    onSubmitClick() {
        if(this.state.ingredients == "" || this.state.name == "") {
            this.props.onClose()
        } else {
        var data = this.state;
        this.setState(
            this.defaultState
        )
        this.props.onSubmit(data)
        console.log(this.props.onClose)
    }
    }

    stopPropagation(e) {
        e.stopPropagation()
    }

    render() {
        return (
            <div id="Modal" className={this.isOpen() + " modal"} role="dialog" onClick={this.props.onClose}>
                <div className="modal-dialog" onClick={this.stopPropagation}>
                    <div id="newRecipe" className="modal-content" >
                        <div className="modal-header">
                            <h3>Add New Recipe</h3>
                        </div>
                        <div className="modal-body">
                            <form>
                                <p>
                                    <label>Name:</label>
                                    <input id='name' value={this.state.name} onChange={this.handleNameChange} />
                                </p>
                                <p>
                                    <label>Ingredients:</label>
                                    <textarea id='ingredients'
                                        value={this.state.ingredients.join(" ")}
                                        onChange={this.handleModalChange} />
                                </p>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" data-dismiss="modal" onClick={this.onSubmitClick.bind(this)}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal