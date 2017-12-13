import React from 'react'
import Recipe from './Recipe'
import Modal from './Modal'
import InputForm from './InputForm'
import TextArea from './TextArea'
import Button from './Button'


require('../Style/RecipeBox.scss')

class RecipeBox extends React.Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this)
        this.newRecipe = this.newRecipe.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSubmitClick = this.onSubmitClick.bind(this)
        this.onEdit = this.onEdit.bind(this)

        this.state = {
            modalOpen: false,
            ingrOpen: false,
            inputName: "",
            inputText: "",
            recipes: [
                {
                    name: "Vodka Tonic",
                    text: ["vodka", "tonic"],
                    isOpen: false
                },
                {
                    name: "Gin & Tonic",
                    text: ["gin", "tonic"],
                    isOpen: false
                }
            ]
        }
    }

    handleChange(id, value) {
        this.setState({
            [id]: value
        })
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

    onEdit(name, text) {
        let newText = text.join(" ")

        this.setState({
            inputName: name,
            inputText: newText
        })
        this.toggleModal()
    }

    onSubmitClick() {
        if (name && list) {
            let name = this.state.name
            let list = []
            let input = this.state.text

            input = input.split(" ")

            for (let i = 0; i < input.length; i++) {
                list.push(input[i])
            }


            let data = {
                name,
                text: list,
                isOpen: false
            }
            this.newRecipe(data)
            console.log(data)
        }
    }

    renderRecipes(index) {
        const recipeList = this.state.recipes.map((item, index) => {
            let id = item.name
            let ingredients = item.text
            return (
                <Recipe
                    id={id}
                    ingredients={ingredients}
                    isOpen={item.isOpen}
                    key={index}
                    onClick={() => this.handleRecipeClick(index)}
                    onEdit={this.onEdit}
                />
            )
        })
        return recipeList
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
                    onClose={this.toggleModal}
                    title="New Recipe"
                    name={
                        <InputForm
                            onChange={this.handleChange}
                            label="Name:"
                            id="name"
                            defaultValue={this.state.inputName}
                        />
                    }
                    list={
                        <TextArea
                            label="Ingredients:"
                            id="text"
                            onChange={this.handleChange}
                            defaultValue={this.state.inputText}
                        />
                    }
                    button={<Button onClick={this.onSubmitClick} id="Submit" />}
                />
                <div className="container">
                    {this.renderRecipes()}
                    <Button onClick={this.toggleModal} id="Add New" />
                </div>
            </div>
        )
    }
}

export default RecipeBox