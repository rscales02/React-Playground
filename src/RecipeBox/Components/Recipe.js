import React from "react";
import * as actions from "../Actions";
import { connect } from 'react-redux'
import Button from "../../Universal-Components/Components/Button";

const Recipe = ({ id, isOpen, name, text, onDelete, onEdit, onToggleList }) => {
  let textMap = isOpen ? (
    <div className="ingredients">
      {text.map((item, index) => <div key={index}>{item}</div>)}
      <Button onClick={() => onEdit(id)} id="Edit" />
      <Button onClick={() => onDelete(id)} id="Delete" />
    </div>
  ) : null;
  return (
    <div className="recipe">
      <div className="id">
        <a href="#" onClick={() => onToggleList(id)}>
          {name || "???"}
        </a>
      </div>
      <div >{textMap}</div>
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  onToggleList: actions.toggleRecipe,
  onDelete: actions.deleteRecipe,
};

const RecipeContainer = connect(mapStateToProps, mapDispatchToProps)(Recipe);

export default RecipeContainer;
