import React, {useState, useRef, useEffect} from 'react';
import ToDoList from './ToDoList';
import uuidv4 from 'uuid/v4';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
	const [todos, setTodos] = useState([]) //sample object in array {id:1, name:'Todo1', complete: true}
	const toDoNameRef = useRef()

	useEffect(() => { 
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
		if(storedTodos) setTodos(storedTodos)
	}, [])

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
	}, [todos])

	function toggleTodo(id){
		const newTodos = [...todos]
		const todo = newTodos.find(todo => todo.id === id )
		todo.complete = !todo.complete
		setTodos(newTodos)
	}



	function handleAddToDo (event) {
		const name = toDoNameRef.current.value
		if(name === '') return
		setTodos(prevTodos => {
			return [...prevTodos,  {id:uuidv4(), name:name, complete: false}]
		})	
		
		toDoNameRef.current.value = null
	}

	function handleClearTodos () {
		const newTodos = todos.filter(todo => !todo.complete)
		setTodos(newTodos)
		}
	
  return (

    <><ToDoList todos= {todos} toggleTodo = {toggleTodo} />
    <input ref={toDoNameRef} type='text' /> 
    <button onClick={handleAddToDo}>Add To Do</button>
    <button onClick={handleClearTodos}>Clear Completed To Do</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
    )
}

export default App;
