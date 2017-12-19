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
        this.addNewRecipe = this.addNewRecipe.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSubmitClick = this.onSubmitClick.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.newRecipe = this.newRecipe.bind(this)
        this.toDelete = this.toDelete.bind(this)

        this.state = {
            modalOpen: false,
            addingNew: true,
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

    addNewRecipe(data) {
        var recipes = this.state.recipes
        recipes.push(data)
        this.setState({
            recipes,
        })
        this.toggleModal()
    }

    newRecipe() {
        this.setState({
            addingNew: true
        })
        this.toggleModal()
    }

    onEdit(name) {
        let index;

        for (let i = 0; i < this.state.recipes.length; i++) {
            if (this.state.recipes[i].name == name) {
                index = i
            }
        }
        let newText = this.state.recipes[index].text
        newText = newText.join(" ")

        this.setState({
            inputName: name,
            inputText: newText,
            addingNew: false,
            index
        })
        this.toggleModal()
    }


    onSubmitClick() {
        let index = this.state.index
        let name = this.state.inputName
        let input = this.state.inputText
        let list = input.split(" ")
        let recipes = this.state.recipes

        if (name && list && this.state.addingNew) {
            let data = {
                name,
                text: list,
                isOpen: false
            }
            this.addNewRecipe(data)
            this.reset()
        } else {
            recipes[index].name = name
            recipes[index].text = list
            this.setState({
                recipes
            })
            this.reset()
            this.toggleModal()
        }
    }

    reset() {
        this.setState({
            inputName: "",
            inputText: ""
        })
    }

    toDelete(name) {
        let index;

        for (let i = 0; i < this.state.recipes.length; i++) {
            if (this.state.recipes[i].name == name) {
                index = i
            }
        }
        let recipes = this.state.recipes
        recipes.splice(index, index + 1)

        this.setState({
            recipes
        })
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
                >
                    <form>
                        <InputForm
                            onChange={this.handleChange}
                            label="Name:"
                            id="inputName"
                            value={this.state.inputName}
                        />
                        <TextArea
                            label="Ingredients:"
                            id="inputText"
                            onChange={this.handleChange}
                            value={this.state.inputText}
                        />
                        <Button onClick={this.onSubmitClick} id="Submit" />
                    </form>
                </Modal>
                <div className="container">
                    {this.state.recipes.map((item, index) => {
                        return (
                            <Recipe
                                key={index}
                                ingredients={item.text}
                                isOpen={item.isOpen}
                                name={item.name}
                                onEdit={this.onEdit}
                                toDelete={this.toDelete}
                            />
                        )
                    })}
                    <Button onClick={this.newRecipe} id={"Add New"} />
                </div>
            </div>
        )
    }
}

export default RecipeBox

//recipe box is only an app container, this is not needed as it is contained in Switcher
//the only "necessary" component is a list, with lists embeded. (i.e a list of 
// ingredients... list-ception!!!)... The modal just needs to be controlled by the parent list
// of recipes.  Parent list holds state of the recipe catalog, renders modal, and calls each 
//new list 