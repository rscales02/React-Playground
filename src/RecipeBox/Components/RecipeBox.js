import React from 'react'
import Recipe from './Recipe'
import Modal from './Modal'
import Input from './Input'
import TextArea from './TextArea'
import Button from '../../Universal-Components/Components/Button'
import { connect } from 'react-redux'
import { toggleModal } from '../Actions'

require('../Style/RecipeBox.scss')

const RecipeBox = ({ ...props }) => {
  let inputName,
    inputText

  const handleChange = (id, input) => {
    if (id === "inputName") {
      inputName = input
    } else {
      inputText = input
    }
    return ({ inputName, inputText })
  }

  const onSubmitClick = () => {
    let list = inputText.split(" ")
    props.onAdd(inputName, list)
    toggleModal()
  }

  const onToggle = (id) => {
    props.onToggleList(id)
  }

  const toggleModal = () => {
    props.onToggleModal(1)
  }

  let modalShow = props.modal.modalShow
  let modal = modalShow ? (
    <Modal
      onClose={toggleModal}
      title="New Recipe"
    >
      <form>
        <Input
          id="inputName"
          label="Name:"
          onChange={handleChange}
        />
        <TextArea
          id="inputText"
          label="Ingredients:"
          onChange={handleChange}
        />
        <Button onClick={onSubmitClick} id="Submit" />
      </form>
    </Modal>
  ) : null
  return (
    <div className="recipebox">
      {modal}
      <div className="container">
        {props.recipes.map((item, index) => {
          return (
            <Recipe {...item}
              key={index}
              onToggleOpen={() => onToggle(item.id)}
              /* onToggleEdit={props.onToggleEdit(item.id)} */
              onDelete={props.onDelete}
            />
          )
        })}
        <Button onClick={toggleModal} id={"Add New"} />
      </div>
    </div>
  )

}

export default RecipeBox
