import { useState, useEffect } from 'react'
import './index.css'
import Form from "./components/Form";
import ToDoList from "./components/ToDoList";
import Footer from "./components/Footer";


function App() {

const [todos, setTodos] = useState([

  {
    completed: true,
    text: "3 Litre su iç",
    id: 1
  },

  {
    completed: false,
    text: "50 push-up",
    id: 2
  },

  {
    completed: true,
    text: "200 Sayfa kitap oku",
    id: 3
  }
]);

const [status, setStatus] = useState("");

const [filteredTodos, setFilteredTodos] = useState([]);

useEffect(() => {
  getLocalTodos();
}, [])

useEffect(() => {
  const filterHandler = () => {
    
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "active":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  filterHandler();
  saveLocalTodos();
}, [todos, status]);

const saveLocalTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
}

const getLocalTodos = () => {
  if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", JSON.stringify([]))
  } else {
    setTodos(JSON.parse(localStorage.getItem("todos")))
  }
};

  return (

    <div className="todoapp">
			<header className="header">
				<h1>React To-do</h1>
				<Form todos={todos} setTodos={setTodos} />
			</header>
			<div className="main">
				<ul className="todo-list">
					{filteredTodos.map((todo) => {
						return (
							<ToDoList
								status={status}
								key={todo.id}
								todo={todo}
								text={todo.text}
								todos={todos}
								setTodos={setTodos}
							/>
						);
					})}
				</ul>
			</div>
			<div className="footer">
				<Footer
					status={status}
					setStatus={setStatus}
					todos={todos}
					setTodos={setTodos}
				/>
			</div>
		</div>
  )
}

export default App;
