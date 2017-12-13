import React from 'react';
import ReactDOM from 'react-dom';
import Switcher from './Switcher/Switcher'
import { AppContainer } from 'react-hot-loader'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('mount'),
  )
}

render(Switcher)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Switcher/Switcher', () => render(require('./Switcher/Switcher').default));
}
