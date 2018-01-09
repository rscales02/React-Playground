import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../Reducers";
import RecipeBoxContainer from "../Containers/RecipeBoxContainer";
import { loadState, saveState } from "../../Universal-Components/Components/LocalStorage";

const persistedState = loadState();

const configureStore = (persistedState) => {
  const store = createStore(rootReducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../Reducers', () => {
      const nextRootReducer = require('../Reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
const store = configureStore()
store.subscribe(() => {
  console.log(store.getState());
  
  saveState(store.getState().recipes);
});

const RecipeBoxApp = () => {
  return (
    <Provider store={store}>
      <RecipeBoxContainer />
    </Provider>
  );
};

export default RecipeBoxApp;
