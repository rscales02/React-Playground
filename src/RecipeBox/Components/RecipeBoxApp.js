import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import recipeReducer from '../Reducers'
import RecipeBoxContainer from '../Containers/RecipeBoxContainer'
import { loadState, saveState } from '../../Universal-Components/Components/LocalStorage'


export default class RecipeBoxApp extends React.Component {
  constructor(props) {
    super(props)

    const persistedState = loadState()
    this.store = createStore(recipeReducer, persistedState)
  }


  render() {
    return (
      <Provider store={this.store} >
        <RecipeBoxContainer />
      </Provider>
    )
  }
}