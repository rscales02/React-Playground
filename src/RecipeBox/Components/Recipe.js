import React from 'react'

require('../Style/Recipe.scss')

class Recipe extends React.Component {
    constructor(props) {
        super(props)
    }

    renderIngredients() {
        let ingredients = this.props.ingredients

        ingredients = ingredients.split(" ")
        ingredients = ingredients.map((item, index) => <div key={index}>{item}</div> )

        return ingredients
    }

    render() {

        return (
            <div className="recipe">
                <div className="id">{this.props.id}</div>
                <div className="ingredients">{this.renderIngredients()}</div>
            </div>
        )
    }
}

export default Recipe