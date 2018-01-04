import React from "react";
import Recipe from "./Recipe";
import Modal from "./Modal";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "../../Universal-Components/Components/Button";

require("../Style/RecipeBox.scss");

class RecipeBox extends React.Component {
  constructor(props) {
    super(props);

    this.editRecipe = this.editRecipe.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.modalEditToggle = this.modalEditToggle.bind(this)
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.reset = this.reset.bind(this)

    this.state = {
      editmode: false,
      id: undefined,
      inputText: undefined,
      inputName: undefined
    };
  }

  componentWillReceiveProps() {
    let inputName, inputText
    this.props.recipes.map(recipe => {
        if (recipe.editMode === true) {
          inputName = recipe.name
          inputText = recipe.text
          this.setState({
            editmode: true,
            inputName,
            inputText
          }, () => {console.log(this.state.inputName)});
        } 
    })
  }

  editRecipe = () => {
    this.props.recipes.map(recipe => {
      if (recipe.editMode === true) {
        id = recipe.id;
        inputName = recipe.name;
        inputText = recipe.text.join(" ");
      }
    });
  };

  handleChange = (id, input) => {
    this.setState(prevState => {
      if (id == "inputName") {
        return { inputName: input };
      } else {
        return { inputText: input };
      }
    });
  };

  modalEditToggle() {
    this.props.onToggleModal()
    this.props.recipes.map(recipe => {
      recipe.editMode === true
        ? this.props.onToggleEdit(recipe.id)
        : recipe
    })
    this.setState({
      editmode: false
    })
    this.reset()
  }

  onSubmitClick = () => {
    let editmode = this.state.editmode;
    let list = this.state.inputText.split(" ");
    let name = this.state.inputName;
    if (editmode) {
      this.props.onEdit(this.state.id, name, list);
    } else {
      this.props.onAdd(name, list);
    }
    this.reset()
    this.props.onToggleModal();
    this.setState({
      editmode: false
    })
  };

  reset() {
    this.setState({
      inputText: undefined,
      inputName: undefined
    })
  }

  render() {
    let modalShow = this.props.modal.modalShow;
    let modal = modalShow ? (
      <Modal onClose={this.modalEditToggle} title="New Recipe">
        <form>
          <Input
            id="inputName"
            label="Name:"
            value={this.state.inputName}
            onChange={this.handleChange}
          />
          <TextArea
            id="inputText"
            label="Ingredients:"
            value={this.state.inputText}
            onChange={this.handleChange}
          />
          <Button onClick={this.onSubmitClick} id="Submit" />
        </form>
      </Modal>
    ) : null;
    return (
      <div className="recipebox">
        {modal}
        <div className="container">
          {this.props.recipes.map((item, index) => {
            return (
              <Recipe
                {...item}
                id={item.id}
                key={item.id}
                onDelete={this.props.onDelete}
                onToggleEdit={this.props.onToggleEdit}
                toggleList={this.props.onToggleList}
                toggleModal={this.props.onToggleModal}
              />
            );
          })}
          <Button onClick={this.props.onToggleModal} id={"Add New"} />
        </div>
      </div>
    );
  }
}

export default RecipeBox;
