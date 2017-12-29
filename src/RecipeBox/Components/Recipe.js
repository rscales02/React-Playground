import React from 'react'
import classNames from 'classnames'
import Button from '../../Universal-Components/Components/Button'

require('../Style/Recipe.scss')

const Recipe = ({ isOpen, name, text, onToggleOpen, onToggleEdit, onDelete }) => {
  return (
    <div className="recipe">
      <div className="id">
        <a href="#" onClick={() => onToggleOpen(name)} >{name}</a>
      </div>
      <div className={classNames({ "open": isOpen }, "ingredients")} >
        {text.map((item, index) => {
          return <div key={index}>{item}</div>
        })}
        <Button onClick={() => onToggleEdit(id)} id="Edit" />
        <Button onClick={() => onDelete(id)} id="Delete" />
      </div>
    </div >
  )
}

export default Recipe