let nextRecipeId = 0;

export const addRecipe = (name, text) => {
  return {
    type: 'ADD_RECIPE',
    id: nextRecipeId++,
    name,
    text
  }
}

export const toggleRecipe = (id) => {
  console.log(id)
  return {
    type: 'TOGGLE_RECIPE',
    id,
  }
}

export const deleteRecipe = (id) => {
  return {
    type: 'DELETE_RECIPE',
    id
  }
}

export const toggleRecipeEdit = (id) => {
  return {
    type: 'TOGGLE_RECIPE_EDIT',
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
