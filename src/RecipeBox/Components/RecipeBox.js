import React from 'react'
import Recipe from './Recipe'
import Modal from './Modal'

require('../Style/RecipeBox.scss')

class RecipeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            recipes: [
                {
                    name: "Vodka Tonic",
                    ingredients: "vodka tonic",
                },
                {
                    name: "Gin & Tonic",
                    ingredients: "gin tonic"
                }
            ]
        }
    }

    renderRecipes() {
        const recipeList = this.state.recipes.map(
            (item, index) => <Recipe id={item.name} ingredients={item.ingredients} key={index} />
        )
        
        return recipeList
    }

    getModal() {
        this.setState({
            open: true,
        })
    }

    handleClick() {
        this.setState({
            open: false,
        })
    }

    render() {
        return (
            <div className="recipebox">
                <Modal
                    open={this.state.open}
                    onClick={this.handleClick.bind(this)}
                />
                <div className="container">
                    {this.renderRecipes()}
                    <button onClick={this.getModal.bind(this)} >Add New</button>
                </div>
            </div>
        )
    }
}

export default RecipeBox