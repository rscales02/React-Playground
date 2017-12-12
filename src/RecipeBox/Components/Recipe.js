import React from 'react'
import classNames from 'classnames'

require('../Style/Recipe.scss')

class Recipe extends React.Component {
    constructor(props) {
        super(props)
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
                <button>edit</button>
                </div>
            </div>
        )
    }
}

export default Recipe