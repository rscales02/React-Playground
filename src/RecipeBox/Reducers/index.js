import { combineReducers } from 'redux'

const recipes = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          isOpen: false,
          text: action.text || []
        }
      ]
    case 'TOGGLE_RECIPE':

      return state.map(recipe =>
        (recipe.id === action.id)
          ? { ...recipe, isOpen: !recipe.isOpen }
          : recipe)
    case 'DELETE_RECIPE':
      return state.filter(recipe => recipe.id != action.id)
    case 'EDIT_RECIPE':
      return state.map(recipe =>
        (recipe.id === action.id)
          ? { id: action.id, name: action.name, text: action.text || [], open: recipe.open }
          : recipe)
    default:
      return state
  }
}

const modal = (state = { modalShow: false }, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return { ...state, modalShow: !state.modalShow }
    default:
      return state
  }
}

const visibility = (state = { edit: null }, action) => {
  switch (action.type) {
    case 'TOGGLE_RECIPE_EDIT':
      return { edit: state.edit ? null : action.id }

    default:
      return state
  }
}

const recipeReducer = combineReducers({
  modal,
  recipes,
  visibility
})

export default recipeReducer