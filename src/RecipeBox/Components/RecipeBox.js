import React from 'react'
import Recipe from './Recipe'
import Modal from './Modal'

require('../Style/RecipeBox.scss')

class RecipeBox extends React.Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this)
        this.newRecipe = this.newRecipe.bind(this)

        this.state = {
            modalOpen: false,
            ingrOpen: false,
            recipes: [
                {
                    name: "Vodka Tonic",
                    ingredients: ["vodka", "tonic"],
                    isOpen: false
                },
                {
                    name: "Gin & Tonic",
                    ingredients: ["gin", "tonic"],
                    isOpen: false
                }
            ]
        }
    }

    renderRecipes(index) {
        const recipeList = this.state.recipes.map((item, index) => {
            return (
                <Recipe
                    id={item.name}
                    ingredients={item.ingredients}
                    isOpen={item.isOpen}
                    key={index}
                    onClick={() => this.handleRecipeClick(index)}
                />
            )
        })
        return recipeList
    }

    handleRecipeClick(index) {
        var recipeOpen = this.state.recipes;
        recipeOpen[index].isOpen = !recipeOpen[index].isOpen

        this.setState({
            recipes: recipeOpen
        })
    }

    newRecipe(data) {
        var recipes = this.state.recipes
        recipes.push(data)
        this.setState({
            recipes,
        })
        this.toggleModal()
    }

    toggleModal() {
        this.setState({
            modalOpen: this.state.modalOpen ? false : true
        })
    }

    render() {
        return (
            <div className="recipebox">
                <Modal
                    open={this.state.modalOpen}
                    onSubmit={this.newRecipe}
                    onClose={this.toggleModal}
                />
                <div className="container">
                    {this.renderRecipes()}
                    <button onClick={this.toggleModal} >Add New</button>
                </div>
            </div>
        )
    }
}

export default RecipeBox