import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import recipeReducer from '../Reducers'
import RecipeBoxContainer from '../Containers/RecipeBoxContainer'
import { loadState, saveState } from '../../Universal-Components/Components/LocalStorage'

let store = createStore(recipeReducer)

const RecipeBoxApp = () => {
  return (
    <Provider store={store} >
      <RecipeBoxContainer />
    </Provider>
  )
}

export default RecipeBoxApp