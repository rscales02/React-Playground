import React from 'react'
import classNames from 'classnames'
import Button from './Button'

require('../Style/Recipe.scss')

class Recipe extends React.Component {
    constructor(props) {
        super(props)
        this.openEdit = this.openEdit.bind(this)
        this.toggleOpen = this.toggleOpen.bind(this)
        this.toDelete = this.toDelete.bind(this)

        this.state = {
            isOpen: this.props.isOpen
        }
    }

    toDelete() {
        let name = this.props.name
        this.props.toDelete(name)
    }

    openEdit() {
        let name = this.props.name
        let text = this.props.ingredients


        this.props.onEdit(name)
    }

    toggleOpen() {
        this.setState({
            isOpen: this.state.isOpen ? false : true
        })
    }

    render() {
        return (
            <div className="recipe">
                <div className="id">
                    <a href="#" onClick={this.toggleOpen} >{this.props.name}</a>
                </div>
                <div className={classNames({ "open": this.state.isOpen }, "ingredients")} >
                    {this.props.ingredients.map((item, index) => {
                        return <div key={index}>{item}</div>
                    })}
                    <Button onClick={this.openEdit} id="Edit" />
                    <Button onClick={this.toDelete} id="Delete" />
                </div>
            </div>
        )
    }
}

export default Recipe