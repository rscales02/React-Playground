import { combineReducers } from "redux";

const recipes = (state = [], action) => {
  switch (action.type) {
    case "ADD_RECIPE":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          isOpen: false,
          text: action.text || []
        }
      ];
    case "DELETE_RECIPE":
      return state.filter(recipe => recipe.id != action.id);
    case "EDIT_RECIPE":
      return state.map(
        recipe =>
          recipe.id === action.id
          ? {...recipe, name: action.name, text: action.text}
          : recipe
      )
    case "TOGGLE_RECIPE_EDIT":
      return state.map(
        recipe =>
          recipe.id === action.id
            ? { ...recipe, editMode: !recipe.editMode }
            : recipe
      );
    case "TOGGLE_RECIPE":
      return state.map(
        recipe =>
          recipe.id === action.id
            ? { ...recipe, isOpen: !recipe.isOpen }
            : recipe
      );
    default:
      return state;
  }
};

const modal = (state = { modalShow: false }, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return {
        ...state,
        modalShow: !state.modalShow
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  modal,
  recipes
});

export default rootReducer;
