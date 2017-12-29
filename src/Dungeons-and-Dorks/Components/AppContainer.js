import React from 'react'
import Map from './Map'
import { Provider } from 'react-redux'
import { createStore } from 'redux'



export default class AppContainer extends React.Component {
  render() {
    return (
      <Provider  >
        {/* Board */}
        <Map />
      </Provider>
    )
  }
}