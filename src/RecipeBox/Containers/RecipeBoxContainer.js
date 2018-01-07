import { connect } from 'react-redux'
import * as actions from '../Actions'
import RecipeBox from '../Components/RecipeBox'


const mapStateToProps = (state) => ({
  modal: state.modal,
  recipes: state.recipes,
})

const mapDispatchToProps = ({
  onToggleModal: actions.toggleModal,
  onAdd: actions.addRecipe,
  onEdit: actions.editRecipe,
})

const RecipeBoxContainer = connect(mapStateToProps, mapDispatchToProps)(RecipeBox)

export default RecipeBoxContainer