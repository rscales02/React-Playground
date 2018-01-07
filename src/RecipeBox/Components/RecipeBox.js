import React from "react";
import RecipeContainer from "./Recipe";
import Modal from "./Modal";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "../../Universal-Components/Components/Button";

require("../Style/RecipeBox.scss");

class RecipeBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editmode: undefined,
      inputText: undefined,
      inputName: undefined
    };
  }

  editRecipe = (id) => {
    let recipe = this.props.recipes.find(recipe => recipe.id === id);
    let text = recipe.text.join(" ")
    this.setState({
      editId: id,
      inputName: recipe.name,
      inputText: text
    })

    this.props.onToggleModal()
}

  handleChange = (id, input) => {
    this.setState(prevState => {
      if (id == "inputName") {
        return { inputName: input };
      } else {
        return { inputText: input };
      }
    });
  };

  
  onSubmitClick = () => {
    let editmode = this.state.editmode;
    let list = this.state.inputText.split(" ");
    let name = this.state.inputName;
    if (!!this.state.editId) {
      this.props.onEdit(this.state.editId, name, list);
    } else {
      this.props.onAdd(name, list);
    }
    this.reset()
    this.props.onToggleModal();
  };

  reset() {
    this.setState({
      editId: undefined,
      inputText: undefined,
      inputName: undefined
    })
  }

  render() {
    let modalShow = this.props.modal.modalShow;
    let modal = modalShow ? (
      <Modal onClose={this.props.onToggleModal} title="New Recipe">
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
              <RecipeContainer
                {...item}
                id={item.id}
                key={item.id}
                onEdit={this.editRecipe}
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
