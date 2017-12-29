import React from 'react'
import Recipe from './Recipe'
import Modal from './Modal'
import Input from './Input'
import TextArea from './TextArea'
import Button from '../../Universal-Components/Components/Button'

require('../Style/RecipeBox.scss')

class RecipeBox extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this)
    this.addNewRecipe = this.addNewRecipe.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  onSubmitClick2() {
    let input = this.state.inputText
    let list = input.split(" ")
    if (this.props.editId != 999) {
      this.props.onEdit(this.props.editId, this.state.inputName, list)
    } else {
      this.props.onAdd(this.state.inputName, list)
    }
  }

  reset() {
    this.setState({
      inputName: "",
      inputText: ""
    })
  }


  storeLocal(data) {
    JSON.stringify(data)
    localStorage.clear()
    localStorage.setItem("list", JSON.stringify(data))
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
    let modal = this.state.editId ? (
      <Modal
        onClose={this.props.onToggleEdit}
        title="New Recipe"
      >
        <form>
          <Input
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
          <Button onClick={this.onSubmitClick2.bind(this)} id="Submit" />
        </form>
      </Modal>
    ) : null
    return (
      <div className="recipebox">
        {modal}
        <div className="container">
          {this.state.recipes.map((item, index) => {

            return (
              <Recipe {...item}
                key={index}
                onToggleOpen={this.props.onToggle}
                onToggleEdit={() => {
                  this.setState({
                    inputName: this.state.recipes[item.id].name,
                    inputText: this.state.recipes[item.id].text.join(' ')
                  })
                  this.props.onToggleEdit(item.id)
                }}
                onDelete={this.props.onDelete}
              />
            )
          })}
          <Button onClick={() => this.props.onToggleEdit(999)} id={"Add New"} />
        </div>
      </div>
    )
  }
}

export default RecipeBox
