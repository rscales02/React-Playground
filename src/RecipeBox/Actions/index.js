import {v4} from 'uuid'

export const addRecipe = (name, text) => {
  return {
    type: 'ADD_RECIPE',
    id: v4(),
    name,
    text
  }
}

export const deleteRecipe = (id) => {
  return {
    type: 'DELETE_RECIPE',
    id
  }
}

export const editRecipe = (id, name, text) => {
  return {
    type: 'EDIT_RECIPE',
    id,
    name,
    text
  }
}

export const toggleModal = () => {
  return {
    type: 'TOGGLE_MODAL',
  }
}

export const toggleRecipe = (id) => {
  return {
    type: 'TOGGLE_RECIPE',
    id,
  }
}

export const toggleRecipeEdit = (id) => {
  return {
    type: 'TOGGLE_RECIPE_EDIT',
    id,
  }
}