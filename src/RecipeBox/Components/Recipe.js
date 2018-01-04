import React from 'react'
import * as actions from '../Actions'
import Button from '../../Universal-Components/Components/Button'

require('../Style/Recipe.scss')

const Recipe = ({ id, isOpen, name, onDelete, text, onToggleEdit, toggleList, toggleModal }) => {
  const onEditClick = (id) => {
    onToggleEdit(id),
    toggleModal()
  }
  let textMap = isOpen
    ? <div>
      {text.map((item, index) => <div key={index}>{item}</div>)}
      <Button onClick={() => onEditClick(id)} id="Edit" />
      <Button onClick={() => onDelete(id)} id="Delete" />
    </div>
    : null
  return (
    <div className="recipe">
      <div className="id">
        <a href="#" onClick={() => toggleList(id)} >{name || "???"}</a>
      </div>
      <div className="ingredients" >
        {textMap}
      </div>
    </div >
  )
}

export default Recipe