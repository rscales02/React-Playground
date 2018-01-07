import React from 'react'
import MapContainer from './MapContainer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import combinedReducers from '../Reducers'

let store = createStore(combinedReducers)

store.subscribe(() => console.log(store.getState(), "STATE CHANGE"))

 const AppContainer = () => {
    return (
      <Provider store={store} >
        <MapContainer />
      </Provider>
    )
}

export default AppContainer