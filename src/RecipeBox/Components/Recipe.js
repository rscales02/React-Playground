import React from 'react'
import classNames from 'classnames'
import Button from './Button'

require('../Style/Recipe.scss')

class Recipe extends React.Component {
    constructor(props) {
        super(props)
        this.openEdit = this.openEdit.bind(this)
    }

    openEdit(e) {
        let name = this.props.id
        let text = this.props.ingredients

        this.props.onEdit(name, text)
    }

    renderIngredients() {
        let ingredients = this.props.ingredients

        ingredients = ingredients.map((item, index) => {
            return (
                <div
                    key={index} >
                    {item}
                </div >
            )
        })
        return ingredients
    }

    render() {

        return (
            <div className="recipe">
                <div className="id">
                    <a href="#" onClick={this.props.onClick} >{this.props.id}</a>
                </div>
                <div className={classNames({ "open": this.props.isOpen }, "ingredients")} >
                    {this.renderIngredients()}
                    <Button onClick={this.openEdit} id="Edit" />
                </div>
            </div>
        )
    }
}

export default Recipe