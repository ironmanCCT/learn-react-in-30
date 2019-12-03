import React from 'react'

export default function ToDo({ todo, toggleTodo }) {
	const handleTodoClick = function () {
		toggleTodo(todo.id)
	}
	return (
		<div>
			<label>
			<input type='checkbox' checked={ todo.complete } onChange={handleTodoClick}></input>
			{todo.name}
			</label>
		</div>
	)
}