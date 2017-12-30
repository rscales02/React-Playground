import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, onTodoClick, onDelete }) => (
  <ul>
    {todos.map(todo => (
      <div>
        <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
        {console.log(todo.id)}
        <button onClick={() => onDelete} >x</button>
      </div>
    ))}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList