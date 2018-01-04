import { connect } from 'react-redux'
import * as actions from '../Actions'
import RecipeBox from '../Components/RecipeBox'


const mapStateToProps = (state) => ({
  modal: state.modal,
  recipes: state.recipes,
})

const mapDispatchToProps = ({
  onToggleEdit: actions.toggleRecipeEdit,
  onToggleModal: actions.toggleModal,
  onToggleList: actions.toggleRecipe,
  onAdd: actions.addRecipe,
  onDelete: actions.deleteRecipe,
  onEdit: actions.editRecipe,
})

const RecipeBoxContainer = connect(mapStateToProps, mapDispatchToProps)(RecipeBox)

export default RecipeBoxContainer