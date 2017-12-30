import React from 'react'
import classNames from 'classnames'
import Button from '../../Universal-Components/Components/Button'

require('../Style/Recipe.scss')

const Recipe = ({ isOpen, name, text, onToggleOpen, onToggleEdit, onDelete }) => {
  let textMap = isOpen
    ? <div>
      {text.map((item, index) => <div key={index}>{item}</div>)}
      <Button onClick={() => onToggleEdit(id)} id="Edit" />
      <Button onClick={() => onDelete(id)} id="Delete" />
    </div>
    : 'empty'
  return (
    <div className="recipe">
      <div className="id">
        <a href="#" onClick={() => onToggleOpen(name)} >{name}</a>
      </div>
      <div className={classNames({ "open": isOpen }, "ingredients")} >
        {textMap}
      </div>
    </div >
  )
}

export default Recipe