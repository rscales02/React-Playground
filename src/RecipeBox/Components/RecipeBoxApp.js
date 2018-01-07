import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import recipeReducer from "../Reducers";
import RecipeBoxContainer from "../Containers/RecipeBoxContainer";
import { loadState, saveState } from "../../Universal-Components/Components/LocalStorage";

const persistedState = loadState();

let store = createStore(
  recipeReducer,
  { recipes: persistedState },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
