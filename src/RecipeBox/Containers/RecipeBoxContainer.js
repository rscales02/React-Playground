import { connect } from 'react-redux'
import * as actions from '../Actions'
import RecipeBox from '../Components/RecipeBox'

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  editId: state.visibility.edit
})

const mapDispatchToProps = ({
  onToggleEdit: actions.toggleRecipeEdit,

  onToggle: actions.toggleRecipe,
  onAdd: actions.addRecipe,
  onDelete: actions.deleteRecipe,
  onEdit: actions.editRecipe
})

const RecipeBoxContainer = connect(mapStateToProps, mapDispatchToProps)(RecipeBox)

export default RecipeBoxContainer